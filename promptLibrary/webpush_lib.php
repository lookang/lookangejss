<?php
/**
 * webpush_lib.php — Native VAPID Web Push (RFC 8030 + RFC 8292).
 *
 * Uses "fetch-on-push" (empty payload) so the service worker fetches the
 * latest upload itself — avoids AES-128-GCM payload encryption entirely.
 *
 * Requires: PHP openssl + curl extensions (standard on shared hosting).
 *
 * Public function:
 *   sendWebPushToAll(string $level, string $subject) : void
 */

declare(strict_types=1);

require_once __DIR__ . '/db_config.php';

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Send an empty VAPID push to every subscriber whose level/subject prefs
 * match the uploaded simulation. Expired subscriptions (HTTP 410/404) are
 * deleted automatically.
 */
function sendWebPushToAll(string $level, string $subject): void
{
    if (!defined('VAPID_PUBLIC_KEY') || VAPID_PUBLIC_KEY === '') {
        error_log('webpush_lib: VAPID_PUBLIC_KEY not configured — skipping push');
        return;
    }

    $levelBand  = wpCanonicalLevel($level);
    $subjectGrp = wpCanonicalSubject($subject);

    try {
        $pdo  = getDB();
        $rows = $pdo->query(
            'SELECT id, endpoint, level_pref, subj_prefs FROM push_subscriptions'
        )->fetchAll();
    } catch (PDOException $e) {
        error_log('webpush_lib DB read: ' . $e->getMessage());
        return;
    }

    $staleIds = [];

    foreach ($rows as $row) {
        $wantsLevel = in_array($row['level_pref'] ?? 'all', ['all', $levelBand], true);
        $subjList   = array_filter(array_map('trim', explode(',', $row['subj_prefs'] ?? '')));
        $wantsSubj  = empty($subjList) || in_array($subjectGrp, $subjList, true);

        if (!$wantsLevel && !$wantsSubj) continue;

        $code = wpSendEmpty($row['endpoint']);

        if ($code === 410 || $code === 404) {
            $staleIds[] = (int)$row['id'];
        }
    }

    // Remove expired subscriptions
    if ($staleIds) {
        try {
            $ph = implode(',', array_fill(0, count($staleIds), '?'));
            getDB()->prepare("DELETE FROM push_subscriptions WHERE id IN ($ph)")
                   ->execute($staleIds);
        } catch (PDOException $e) {
            error_log('webpush_lib cleanup: ' . $e->getMessage());
        }
    }
}

// ── Internals ──────────────────────────────────────────────────────────────

/**
 * POST an empty body to a single push endpoint with VAPID auth header.
 * Returns the HTTP response code (201 = success, 410 = subscription expired).
 */
function wpSendEmpty(string $endpoint): int
{
    if (!function_exists('curl_init') || !function_exists('openssl_sign')) return 0;

    $jwt = wpBuildJwt($endpoint, VAPID_PRIVATE_KEY, VAPID_SUBJECT);
    if (!$jwt) return 0;

    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => '',
        CURLOPT_HTTPHEADER     => [
            'Authorization: vapid t=' . $jwt . ',k=' . VAPID_PUBLIC_KEY,
            'TTL: 86400',
            'Content-Length: 0',
            'Content-Type: application/octet-stream',
            'Urgency: normal',
        ],
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    curl_exec($ch);
    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code;
}

/**
 * Build and sign a VAPID JWT for the given push endpoint.
 */
function wpBuildJwt(string $endpoint, string $privateKeyPem, string $subject): ?string
{
    $parsed = parse_url($endpoint);
    if (!$parsed || empty($parsed['host'])) return null;
    $audience = ($parsed['scheme'] ?? 'https') . '://' . $parsed['host'];

    $header  = wpB64u(json_encode(['typ' => 'JWT', 'alg' => 'ES256']));
    $payload = wpB64u(json_encode([
        'aud' => $audience,
        'exp' => time() + 3600,
        'sub' => $subject,
    ]));
    $unsigned = $header . '.' . $payload;

    $pkey = openssl_pkey_get_private($privateKeyPem);
    if (!$pkey) { error_log('webpush_lib: invalid private key PEM'); return null; }
    if (!openssl_sign($unsigned, $derSig, $pkey, 'SHA256')) return null;

    return $unsigned . '.' . wpB64u(wpDerToRaw($derSig));
}

/**
 * Base64url-encode (no padding).
 */
function wpB64u(string $data): string
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Convert DER-encoded ECDSA signature (P-256) to raw 64-byte r||s.
 * DER: 30 <len> 02 <rLen> <r> 02 <sLen> <s>
 */
function wpDerToRaw(string $der): string
{
    $i = 2; // skip SEQUENCE tag + length
    if (strlen($der) > 2 && (ord($der[1]) & 0x80)) {
        $i += (ord($der[1]) & 0x7F); // long-form length (rare for P-256)
    }
    $i++;           $rLen = ord($der[$i++]); $r = substr($der, $i, $rLen); $i += $rLen;
    $i++;           $sLen = ord($der[$i++]); $s = substr($der, $i, $sLen);
    return str_pad(ltrim($r, "\x00"), 32, "\x00", STR_PAD_LEFT)
         . str_pad(ltrim($s, "\x00"), 32, "\x00", STR_PAD_LEFT);
}

function wpCanonicalLevel(string $level): string
{
    $l = strtolower($level);
    if (preg_match('/primary|^p[1-6]$/', $l))                return 'primary';
    if (preg_match('/jc|junior.college|a.?level|pre.?u/', $l)) return 'jc';
    return 'secondary';
}

function wpCanonicalSubject(string $subject): string
{
    $s = strtolower($subject);
    if (preg_match('/physics|chemistry|biology|science/', $s)) return 'sciences';
    if (preg_match('/math/',                              $s)) return 'mathematics';
    if (preg_match('/comput|ict|program|digital/',        $s)) return 'computing';
    if (preg_match('/geo|history|social|economics|cce/',  $s)) return 'humanities';
    if (preg_match('/english|malay|chinese|tamil|language/', $s)) return 'languages';
    if (preg_match('/art|design|music|drama/',            $s)) return 'arts';
    return 'others';
}
