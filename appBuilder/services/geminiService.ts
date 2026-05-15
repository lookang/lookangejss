import { GoogleGenAI } from "@google/genai";
import { type Recipe, type ApiKeys } from '../types';

const SYSTEM_PROMPT = `You are a world-class web developer and educational content creator. Your task is to generate a JSON object containing two properties: "html" and "readme".

1.  **"html" property**:
    -   This should be a string containing a complete, self-contained, offline-first single-file HTML5 interactive educational content.
    -   All CSS and JavaScript must be embedded within the HTML file using <style> and <script> tags. No external libraries or network requests are allowed.
    -   The interactive must be designed to fit within an iframe environment (width: 100%, height: 450px or 90vh, body margin/padding: 0).
    -   The design should be clean, modern, and intuitive for both touch and mouse interactions.
    -   Use Singapore curriculum and notations where applicable.
    -   Do not include a header text to save vertical space; use tooltips for titles if needed.
    -   The HTML must include a footer.
    -   The HTML must include a Google Analytics tracking script in the <head>.
    -   **CRITICAL**: Never use dynamic imports, import() statements, or external asset references. All content must be embedded inline.
    -   **CRITICAL**: Never reference external SVG files, icon files, or any assets with paths like "../assets/" or similar. Use inline SVG or CSS-based icons only.
    -   **CRITICAL**: Avoid any import statements that could cause "Unknown variable dynamic import" errors.

2.  **"readme" property**:
    -   This should be a string containing well-structured Markdown content for a "readMe.md" file.
    -   The README should explain the purpose of the interactive, the educational theories or concepts it's based on, and suggested pedagogical strategies for teachers to use it effectively in a classroom setting.

Your entire response must be a single, valid JSON object, and nothing else. Do not wrap it in markdown backticks.
`;


const getApiKeys = (): ApiKeys => {
    // First try environment variables, then fall back to localStorage
    const envKeys = {
        openAI: process.env.OPENAI_API_KEY || '',
        claude: process.env.CLAUDE_API_KEY || ''
    };
    
    // If environment variables are available, use them
    if (envKeys.openAI || envKeys.claude) {
        return envKeys;
    }
    
    // Otherwise, try localStorage as fallback
    try {
        const savedKeys = localStorage.getItem('apiKeys');
        if (savedKeys) {
            const parsed = JSON.parse(savedKeys);
            return {
                openAI: parsed.openAI || '',
                claude: parsed.claude || ''
            }
        }
    } catch (error) {
        console.error("Failed to load API keys from localStorage:", error);
    }
    return { openAI: '', claude: '' };
};

export type ModelOption = 'gemini' | 'openai' | 'claude' | 'claude4' | 'claude-opus';

type ContentPart = { text: string } | { inlineData: { mimeType: string; data: string } };

export const generateInteractive = async (
    recipe: Recipe, 
    userPrompt: string, 
    model: ModelOption,
    imageBase64: string | null,
    imageMimeType: string | null,
    username: string,
    resourceURL: string,
    // Refinement parameters
    existingHtml: string | null,
    refinementPrompt: string | null,
    refinementImageBase64: string | null,
    refinementImageMimeType: string | null
): Promise<{ html: string; readme: string }> => {
    switch (model) {
        case 'gemini': {
            // Try to bypass referrer restrictions by using a different initialization approach
            const ai = new GoogleGenAI({ 
                apiKey: process.env.GEMINI_API_KEY,
                // Add additional configuration to potentially bypass referrer checks
            });
            
            let fullPrompt: string;
            if (existingHtml && refinementPrompt) {
                // This is a refinement request
                if (existingHtml.includes('xapiwrapper.min.js')) {
                    // Special handling for xAPI prototype refinement
                    fullPrompt = `
                        You are refining an existing xAPI-enabled educational interactive.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        CRITICAL REQUIREMENTS FOR xAPI REFINEMENT:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. Maintain all existing xAPI tracking functionality
                        3. DO NOT modify the xAPI wrapper or index.js functionality
                        4. Keep the existing CSS styling framework
                        5. Apply changes only to the educational content inside the .container div
                        6. Ensure all xAPI tracking continues to work after changes
                        7. Maintain storeState() and getState() function calls
                        8. Keep the interactive compatible with SLS integration
                        9. RETAIN the debug panel if it exists - never remove debugging capabilities
                        10. Never use dynamic imports or external asset references
                        11. Use only inline SVG or CSS-based icons, never external SVG files
                        
                        Apply the requested changes while preserving the xAPI learning analytics functionality.
                        Update the "readme" markdown to reflect the changes made to the interactive.
                    `;
                } else {
                    fullPrompt = `
                        You are refining an existing interactive HTML file.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        Please apply the changes and ensure the new HTML remains a single, self-contained file.
                        Also, update the "readme" markdown to reflect the changes made to the interactive.
                        Maintain the footer and Google Analytics script as they were, with the author "${username}" and URL "${resourceURL}".
                    `;
                }
            } else {
                // This is an initial generation request
                if (recipe.id === 'xapi-prototype') {
                    // Special handling for xAPI prototype
                    fullPrompt = `
                        You are creating an xAPI-enabled educational interactive with debugging capabilities.
                        
                        IMPORTANT: Use this exact HTML structure as your base template and INCLUDE the enhanced debug panel:
                        
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>HTML5 Interactive with Enhanced xAPI Debug</title>
                          <script src="xapiwrapper.min.js"></script>
                          <script src="index.js" defer></script>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              height: 100vh;
                              margin: 0;
                              background-color: #f0f0f0;
                              overflow: hidden;
                            }
                            .container {
                              background: white;
                              padding: 10px;
                              border-radius: 8px;
                              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                              width: 590px;
                              height: 470px;
                              overflow: auto;
                            }
                            .center { text-align: center; }
                            input, select, button {
                              margin: 5px;
                              padding: 6px;
                              font-size: 14px;
                              border: 1px solid #ccc;
                              border-radius: 4px;
                            }
                            button {
                              background-color: #28a745;
                              color: white;
                              cursor: pointer;
                              border: none;
                            }
                            button:hover { background-color: #218838; }
                            
                            /* Enhanced Debug Panel Styles - INCLUDE THESE */
                            .debug-panel {
                              position: fixed;
                              top: 10px;
                              right: 10px;
                              width: 450px;
                              max-height: 85vh;
                              background: #1a1a1a;
                              color: #00ff00;
                              border: 2px solid #333;
                              border-radius: 8px;
                              padding: 10px;
                              font-family: 'Courier New', monospace;
                              font-size: 11px;
                              overflow-y: auto;
                              z-index: 1000;
                              box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                              resize: both;
                            }
                            .debug-header {
                              background: #333;
                              color: #fff;
                              padding: 8px;
                              margin: -10px -10px 10px -10px;
                              border-radius: 6px 6px 0 0;
                              font-weight: bold;
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                            }
                            .debug-toggle {
                              background: #ff4444;
                              color: white;
                              border: none;
                              padding: 4px 8px;
                              border-radius: 4px;
                              cursor: pointer;
                              font-size: 10px;
                            }
                            .debug-section {
                              margin-bottom: 15px;
                              border-bottom: 1px solid #333;
                              padding-bottom: 10px;
                            }
                            .debug-title {
                              color: #ffff00;
                              font-weight: bold;
                              margin-bottom: 5px;
                              display: flex;
                              justify-content: space-between;
                              align-items: center;
                            }
                            .debug-item {
                              margin: 5px 0;
                              padding: 5px;
                              background: #2a2a2a;
                              border-radius: 4px;
                              border-left: 3px solid #555;
                            }
                            .debug-timestamp {
                              color: #888;
                              font-size: 10px;
                            }
                            .debug-success {
                              color: #00ff00;
                              border-left-color: #00ff00;
                            }
                            .debug-error {
                              color: #ff4444;
                              border-left-color: #ff4444;
                            }
                            .debug-warning {
                              color: #ffaa00;
                              border-left-color: #ffaa00;
                            }
                            .debug-info {
                              color: #00aaff;
                              border-left-color: #00aaff;
                            }
                            .debug-clear {
                              background: #666;
                              color: white;
                              border: none;
                              padding: 4px 8px;
                              border-radius: 4px;
                              cursor: pointer;
                              font-size: 10px;
                              margin-left: 5px;
                            }
                            .debug-export {
                              background: #0066cc;
                              color: white;
                              border: none;
                              padding: 4px 8px;
                              border-radius: 4px;
                              cursor: pointer;
                              font-size: 10px;
                              margin-left: 5px;
                            }
                            .debug-count {
                              background: #444;
                              color: #fff;
                              padding: 2px 6px;
                              border-radius: 10px;
                              font-size: 9px;
                            }
                            .sls-status {
                              background: #2a2a2a;
                              border: 1px solid #444;
                              border-radius: 4px;
                              padding: 8px;
                              margin: 5px 0;
                            }
                            .sls-connected {
                              border-left: 3px solid #00ff00;
                            }
                            .sls-disconnected {
                              border-left: 3px solid #ff4444;
                            }
                            .json-viewer {
                              background: #1e1e1e;
                              border: 1px solid #444;
                              border-radius: 4px;
                              padding: 8px;
                              margin: 5px 0;
                              max-height: 200px;
                              overflow-y: auto;
                              font-size: 10px;
                            }
                            .json-key {
                              color: #9cdcfe;
                            }
                            .json-string {
                              color: #ce9178;
                            }
                            .json-number {
                              color: #b5cea8;
                            }
                            .json-boolean {
                              color: #569cd6;
                            }
                          </style>
                        </head>
                        <body>
                          <!-- Enhanced Debug Panel - INCLUDE THIS -->
                          <div id="debug-panel" class="debug-panel">
                            <div class="debug-header">
                              <span>🔍 Enhanced xAPI Debug Console</span>
                              <div>
                                <button id="debug-export" class="debug-export">Export</button>
                                <button id="debug-clear" class="debug-clear">Clear</button>
                                <button id="debug-toggle" class="debug-toggle">Hide</button>
                              </div>
                            </div>
                            <div id="debug-content">
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>🌐 SLS Connection Status</span>
                                </div>
                                <div id="debug-sls-status"></div>
                              </div>
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>📊 Session Info</span>
                                </div>
                                <div id="debug-session"></div>
                              </div>
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>📤 xAPI Statements</span>
                                  <span id="statements-count" class="debug-count">0</span>
                                </div>
                                <div id="debug-statements"></div>
                              </div>
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>💾 State Updates</span>
                                  <span id="states-count" class="debug-count">0</span>
                                </div>
                                <div id="debug-states"></div>
                              </div>
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>🎯 Score Tracking</span>
                                  <span id="scores-count" class="debug-count">0</span>
                                </div>
                                <div id="debug-scores"></div>
                              </div>
                              <div class="debug-section">
                                <div class="debug-title">
                                  <span>⚠️ System Messages</span>
                                  <span id="messages-count" class="debug-count">0</span>
                                </div>
                                <div id="debug-messages"></div>
                              </div>
                            </div>
                          </div>

                          <div class="container">
                            <!-- Your educational content goes here -->
                          </div>
                          
                          <script>
                            // INCLUDE THE COMPLETE EnhancedXAPIDebugger CLASS AND INITIALIZATION
                            // This provides comprehensive real-time debugging of xAPI statements and SLS integration
                            // Your educational content code goes here
                            // Use storeState() to save data - it will automatically create proper SLS-compatible xAPI statements
                            // Use getState() to retrieve data
                            // Track all user interactions for learning analytics
                            // The debug panel shows real-time SLS connection status, statements, scores, and errors
                          </script>
                        </body>
                        </html>

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        CRITICAL REQUIREMENTS:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. INCLUDE the complete debug panel HTML and CSS as shown above
                        3. INCLUDE the complete XAPIDebugger class implementation in your JavaScript
                        4. Use the existing CSS styling framework
                        5. Add your educational content inside the .container div
                        6. Implement xAPI tracking using storeState() and getState() functions
                        7. Track ALL user interactions (clicks, answers, time spent)
                        8. Record correct/incorrect responses for analytics
                        9. The interactive must work with SLS integration
                        10. DO NOT modify the xAPI wrapper or index.js functionality
                        11. The debug panel will show real-time xAPI data for troubleshooting
                        12. Focus on educational value and comprehensive analytics
                        
                        The xAPI functions available:
                        - storeState(data) - saves learning data and sends proper xAPI statements
                        - getState() - retrieves saved data
                        - The debug panel will automatically intercept and display all xAPI activity
                        
                        Create an engaging educational interactive that records detailed learning analytics with full debugging visibility.
                    `;
                } else {
                    fullPrompt = `
                        Recipe Type: ${recipe.title}

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        Additional Requirements for the HTML:
                        - Add this Google Analytics script inside the <head> tag:
                        <script async="true" src="https://www.googletagmanager.com/gtag/js?id=G-S9EWRY1CPJ"></script>
                        <script>
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-S9EWRY1CPJ');
                        </script>

                        - Add this footer to the bottom of the HTML body. Style it to be subtle, dark-themed, and not intrusive (e.g., small, centered, gray text):
                        <footer>
                          <p>Made by ${username}, using Gemini 2.5 Pro. For more resources, visit: <a href="${resourceURL}" target="_blank" style="color: inherit;">${resourceURL}</a></p>
                        </footer>
                    `;
                }
            }


            // Retry logic for better reliability
            const maxRetries = 2;
            let lastError: Error | null = null;
            
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                try {
                    const parts: ContentPart[] = [{ text: fullPrompt }];

                    if (imageBase64 && imageMimeType) {
                        parts.push({
                            inlineData: { mimeType: imageMimeType, data: imageBase64 },
                        });
                    }
                    
                    if (refinementImageBase64 && refinementImageMimeType) {
                        parts.push({
                            inlineData: { mimeType: refinementImageMimeType, data: refinementImageBase64 },
                        });
                    }

                    const contents = parts.length > 1 ? { parts } : fullPrompt;

                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents,
                        config: {
                            systemInstruction: SYSTEM_PROMPT,
                            responseMimeType: "application/json",
                            temperature: 0.7,
                            maxOutputTokens: 8192,
                        }
                    });

                    if (!response || !response.text) {
                        throw new Error("Empty response from Gemini API");
                    }

                    let jsonString = response.text.trim();
                    
                    // Handle potential safety blocks or content filtering
                    if (jsonString.includes('I cannot') || jsonString.includes('I\'m unable') || jsonString.includes('I can\'t')) {
                        throw new Error("Content was blocked by safety filters. Please try rephrasing your request.");
                    }
                
                    // The model can sometimes wrap the JSON in markdown backticks or add extra text.
                    // Let's extract the JSON object from the string to make parsing more robust.
                    const firstBrace = jsonString.indexOf('{');
                    const lastBrace = jsonString.lastIndexOf('}');

                    if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
                        throw new Error("Could not find a valid JSON object in the response");
                    }
                    
                    jsonString = jsonString.substring(firstBrace, lastBrace + 1);

                    // Enhanced JSON validation and repair
                    let cleanJsonString = jsonString;
                    
                    // First, try to fix unterminated strings
                    let braceCount = 0;
                    let inString = false;
                    let escaped = false;
                    let lastValidPosition = 0;
                    
                    for (let i = 0; i < cleanJsonString.length; i++) {
                        const char = cleanJsonString[i];
                        
                        if (escaped) {
                            escaped = false;
                            continue;
                        }
                        
                        if (char === '\\') {
                            escaped = true;
                            continue;
                        }
                        
                        if (char === '"') {
                            inString = !inString;
                            if (!inString) {
                                lastValidPosition = i;
                            }
                            continue;
                        }
                        
                        if (!inString) {
                            if (char === '{') braceCount++;
                            if (char === '}') {
                                braceCount--;
                                lastValidPosition = i;
                            }
                            if (char === ',' || char === ':') {
                                lastValidPosition = i;
                            }
                        }
                    }
                    
                    // If we're in an unterminated string, truncate at last valid position
                    if (inString && lastValidPosition > 0) {
                        console.warn("Detected unterminated string, truncating at position", lastValidPosition);
                        cleanJsonString = cleanJsonString.substring(0, lastValidPosition + 1);
                        
                        // Recalculate brace count after truncation
                        braceCount = 0;
                        inString = false;
                        escaped = false;
                        
                        for (let i = 0; i < cleanJsonString.length; i++) {
                            const char = cleanJsonString[i];
                            
                            if (escaped) {
                                escaped = false;
                                continue;
                            }
                            
                            if (char === '\\') {
                                escaped = true;
                                continue;
                            }
                            
                            if (char === '"') {
                                inString = !inString;
                                continue;
                            }
                            
                            if (!inString) {
                                if (char === '{') braceCount++;
                                if (char === '}') braceCount--;
                            }
                        }
                    }
                    
                    // If JSON is incomplete, try to fix it
                    if (braceCount > 0) {
                        console.warn("JSON appears incomplete, attempting to fix...");
                        
                        // Remove any trailing incomplete content
                        const lastCompleteComma = cleanJsonString.lastIndexOf('",');
                        const lastCompleteColon = cleanJsonString.lastIndexOf('":');
                        const lastBrace = cleanJsonString.lastIndexOf('}');
                        
                        // Find the best truncation point
                        let truncateAt = Math.max(lastCompleteComma, lastCompleteColon, lastBrace);
                        
                        if (truncateAt > 0) {
                            if (cleanJsonString[truncateAt] === ',') {
                                // Remove the comma and everything after
                                cleanJsonString = cleanJsonString.substring(0, truncateAt);
                            } else if (cleanJsonString[truncateAt] === ':') {
                                // Find the opening quote of this property and remove the whole property
                                let quotePos = truncateAt;
                                while (quotePos > 0 && cleanJsonString[quotePos] !== '"') {
                                    quotePos--;
                                }
                                if (quotePos > 0) {
                                    // Look for comma before this property
                                    let commaPos = quotePos - 1;
                                    while (commaPos > 0 && /\s/.test(cleanJsonString[commaPos])) {
                                        commaPos--;
                                    }
                                    if (cleanJsonString[commaPos] === ',') {
                                        cleanJsonString = cleanJsonString.substring(0, commaPos);
                                    } else {
                                        cleanJsonString = cleanJsonString.substring(0, quotePos);
                                    }
                                }
                            }
                        }
                        
                        // Close the JSON object
                        while (braceCount > 0) {
                            cleanJsonString += '}';
                            braceCount--;
                        }
                    }

                    let result;
                    try {
                        result = JSON.parse(cleanJsonString);
                    } catch (parseError) {
                        // If JSON is still invalid, try one more aggressive repair
                        console.warn("JSON still invalid after repair, attempting final fix...");
                        
                        // Look for patterns like "property": } or "property":} and remove them
                        let finalJsonString = cleanJsonString;
                        
                        // Remove properties with missing values
                        finalJsonString = finalJsonString.replace(/,?\s*"[^"]*":\s*[,}]/g, (match) => {
                            if (match.endsWith('}')) {
                                return '}';
                            }
                            return '';
                        });
                        
                        // Clean up any double commas or trailing commas
                        finalJsonString = finalJsonString.replace(/,\s*,/g, ',');
                        finalJsonString = finalJsonString.replace(/,\s*}/g, '}');
                        
                        // If we end up with empty object, create minimal valid structure
                        if (finalJsonString.trim() === '{}' || finalJsonString.trim() === '') {
                            console.warn("JSON completely corrupted, creating fallback response");
                            result = {
                                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Content</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .error { color: #d32f2f; background: #ffebee; padding: 15px; border-radius: 4px; margin: 20px 0; }
        .retry-btn { background: #1976d2; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .retry-btn:hover { background: #1565c0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Content Generation Issue</h1>
        <div class="error">
            <strong>Temporary Issue:</strong> The AI service is experiencing high load or connectivity issues. 
            This is a temporary problem that usually resolves quickly.
        </div>
        <p><strong>What to try:</strong></p>
        <ul>
            <li>Wait a few minutes and try again</li>
            <li>Simplify your request if it's very complex</li>
            <li>Try a different interactive type</li>
            <li>Check your internet connection</li>
        </ul>
        <button class="retry-btn" onclick="window.parent.location.reload()">Try Again</button>
        <p><small>This is a fallback page shown when the AI service is temporarily unavailable.</small></p>
    </div>
</body>
</html>`,
                                readme: `# Content Generation Issue

This is a fallback response generated when the AI service is temporarily experiencing issues.

## What happened?
The AI service (Gemini) returned corrupted or incomplete data, which can happen during:
- High server load
- Network connectivity issues
- Temporary service outages

## What to do?
1. **Wait and retry**: Most issues resolve within a few minutes
2. **Simplify your request**: Try a shorter, simpler prompt
3. **Try different content types**: Some interactive types may work better
4. **Check connectivity**: Ensure stable internet connection

## This is normal
AI services occasionally have temporary issues. The app includes robust error handling and retry logic, but sometimes the service needs a moment to recover.

Try again in a few minutes - it should work normally.`
                            };
                        } else {
                            try {
                                result = JSON.parse(finalJsonString);
                            } catch (finalError) {
                                throw new Error(`JSON repair failed: ${finalError.message}`);
                            }
                        }
                    }
                    
                    if (typeof result.html !== 'string' || typeof result.readme !== 'string') {
                        throw new Error("Invalid JSON structure received from AI. Missing 'html' or 'readme' properties.");
                    }
                    
                    // Validate HTML content
                    if (!result.html || (!result.html.toLowerCase().includes('<!doctype html>') && !result.html.toLowerCase().includes('<html>'))) {
                        throw new Error("Failed to generate valid HTML content. The AI model returned an unexpected format.");
                    }

                    // Validate README content
                    if (!result.readme || result.readme.length < 10) {
                        console.warn("README content appears incomplete, using fallback");
                        result.readme = `# Interactive Content\n\nThis interactive educational content was generated using AI.\n\n## Usage\n\nOpen the HTML file in a web browser to use the interactive content.\n\n## Educational Purpose\n\nThis content is designed for educational use and includes interactive elements to engage learners.`;
                    }

                    return result;

                } catch (error) {
                    lastError = error instanceof Error ? error : new Error('Unknown error occurred');
                    console.error(`Gemini API attempt ${attempt + 1} failed:`, error);
                    
                    // If this is the last attempt, throw the error
                    if (attempt === maxRetries) {
                        break;
                    }
                    
                    // Wait before retrying (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                }
            }
            
            // If we get here, all retries failed
            throw new Error(`Failed after ${maxRetries + 1} attempts. Last error: ${lastError?.message || 'Unknown error'}`);
        }
        case 'openai': {
            // Use backend proxy for OpenAI
            let fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;
            
            try {
                const response = await fetch('/api/openai', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: 'system', content: SYSTEM_PROMPT },
                            { role: 'user', content: userPrompt }
                        ],
                        model: 'gpt-4o'
                    })
                });

                if (!response.ok) {
                    throw new Error(`Backend proxy error: ${response.status}`);
                }

                const data = await response.json();
                const content = data.choices?.[0]?.message?.content;

                if (!content) {
                    throw new Error("OpenAI returned an empty response");
                }

                const result = JSON.parse(content);
                
                if (typeof result.html !== 'string' || typeof result.readme !== 'string') {
                    throw new Error("Invalid JSON structure received from OpenAI. Missing 'html' or 'readme' properties.");
                }

                return result;

            } catch (error) {
                console.error("Error calling OpenAI via backend proxy:", error);
                if (error instanceof Error) {
                    throw new Error(`OpenAI API error: ${error.message}`);
                }
                throw new Error("An error occurred while generating content with OpenAI.");
            }
        }
        case 'claude-opus': {
            // Use backend proxy for Claude Opus (most capable model)
            let fullPrompt: string;
            if (existingHtml && refinementPrompt) {
                // This is a refinement request
                if (existingHtml.includes('xapiwrapper.min.js')) {
                    fullPrompt = `
                        You are refining an existing xAPI-enabled educational interactive.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        CRITICAL REQUIREMENTS FOR xAPI REFINEMENT:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. Maintain all existing xAPI tracking functionality
                        3. DO NOT modify the xAPI wrapper or index.js functionality
                        4. Keep the existing CSS styling framework
                        5. Apply changes only to the educational content inside the .container div
                        6. Ensure all xAPI tracking continues to work after changes
                        7. Maintain storeState() and getState() function calls
                        8. Keep the interactive compatible with SLS integration
                        
                        Apply the requested changes while preserving the xAPI learning analytics functionality.
                        Update the "readme" markdown to reflect the changes made to the interactive.
                    `;
                } else {
                    fullPrompt = `
                        You are refining an existing interactive HTML file.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        Please apply the changes and ensure the new HTML remains a single, self-contained file.
                        Also, update the "readme" markdown to reflect the changes made to the interactive.
                        Maintain the footer and Google Analytics script as they were, with the author "${username}" and URL "${resourceURL}".
                    `;
                }
            } else {
                // This is an initial generation request
                if (recipe.id === 'xapi-prototype') {
                    fullPrompt = `
                        You are creating an xAPI-enabled educational interactive based on the provided template.
                        
                        IMPORTANT: Use this exact HTML structure as your base template:
                        
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>HTML5 Interactive</title>
                          <script src="xapiwrapper.min.js"></script>
                          <script src="index.js" defer></script>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              height: 100vh;
                              margin: 0;
                              background-color: #f0f0f0;
                              overflow: hidden;
                            }
                            .container {
                              background: white;
                              padding: 10px;
                              border-radius: 8px;
                              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                              width: 590px;
                              height: 470px;
                              overflow: auto;
                            }
                            .center { text-align: center; }
                            input, select, button {
                              margin: 5px;
                              padding: 6px;
                              font-size: 14px;
                              border: 1px solid #ccc;
                              border-radius: 4px;
                            }
                            button {
                              background-color: #28a745;
                              color: white;
                              cursor: pointer;
                              border: none;
                            }
                            button:hover { background-color: #218838; }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <!-- Your educational content goes here -->
                          </div>
                          
                          <script>
                            // Your xAPI tracking code goes here
                            // Use storeState() to save data
                            // Use getState() to retrieve data
                            // Track all user interactions for learning analytics
                          </script>
                        </body>
                        </html>

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        CRITICAL REQUIREMENTS:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. Use the existing CSS styling framework
                        3. Add your educational content inside the .container div
                        4. Implement xAPI tracking using storeState() and getState() functions
                        5. Track ALL user interactions (clicks, answers, time spent)
                        6. Record correct/incorrect responses for analytics
                        7. The interactive must work with SLS integration
                        8. DO NOT modify the xAPI wrapper or index.js functionality
                        9. Focus on educational value and comprehensive analytics
                        
                        The xAPI functions available:
                        - storeState(data) - saves learning data
                        - getState() - retrieves saved data
                        - updateStore() - updates the current state
                        
                        Create an engaging educational interactive that records detailed learning analytics.
                    `;
                } else {
                    fullPrompt = `
                        Recipe Type: ${recipe.title}

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        Additional Requirements for the HTML:
                        - Add this Google Analytics script inside the <head> tag:
                        <script async="true" src="https://www.googletagmanager.com/gtag/js?id=G-S9EWRY1CPJ"></script>
                        <script>
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-S9EWRY1CPJ');
                        </script>

                        - Add this footer to the bottom of the HTML body. Style it to be subtle, dark-themed, and not intrusive (e.g., small, centered, gray text):
                        <footer>
                          <p>Made by ${username}, using Claude 3 Opus. For more resources, visit: <a href="${resourceURL}" target="_blank" style="color: inherit;">${resourceURL}</a></p>
                        </footer>
                    `;
                }
            }

            try {
                const messages: any[] = [
                    { role: 'user', content: `${SYSTEM_PROMPT}\n\n${fullPrompt}` }
                ];

                // Add image if provided
                if (imageBase64 && imageMimeType) {
                    messages[0].content = [
                        { type: 'text', text: `${SYSTEM_PROMPT}\n\n${fullPrompt}` },
                        { 
                            type: 'image', 
                            source: {
                                type: 'base64',
                                media_type: imageMimeType,
                                data: imageBase64
                            }
                        }
                    ];
                }

                const response = await fetch('/api/claude', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: messages,
                        model: 'claude-opus-4-1-20250805',  // Use Claude Opus 4.1 model
                        max_tokens: 4000,
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    throw new Error(`Backend proxy error: ${response.status}`);
                }

                const data = await response.json();
                const content = data.content?.[0]?.text;

                if (!content) {
                    throw new Error("Claude returned an empty response");
                }

                // Extract JSON from Claude's response (it might include extra text)
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("Could not find JSON in Claude's response");
                }

                const result = JSON.parse(jsonMatch[0]);
                
                if (typeof result.html !== 'string' || typeof result.readme !== 'string') {
                    throw new Error("Invalid JSON structure received from Claude. Missing 'html' or 'readme' properties.");
                }

                return result;

            } catch (error) {
                console.error("Error calling Claude Opus via backend proxy:", error);
                if (error instanceof Error) {
                    throw new Error(`Claude Opus API error: ${error.message}`);
                }
                throw new Error("An error occurred while generating content with Claude Opus.");
            }
        }
        case 'claude4':
        case 'claude': {
            // Use backend proxy for Claude

            let fullPrompt: string;
            if (existingHtml && refinementPrompt) {
                // This is a refinement request
                if (existingHtml.includes('xapiwrapper.min.js')) {
                    fullPrompt = `
                        You are refining an existing xAPI-enabled educational interactive.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        CRITICAL REQUIREMENTS FOR xAPI REFINEMENT:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. Maintain all existing xAPI tracking functionality
                        3. DO NOT modify the xAPI wrapper or index.js functionality
                        4. Keep the existing CSS styling framework
                        5. Apply changes only to the educational content inside the .container div
                        6. Ensure all xAPI tracking continues to work after changes
                        7. Maintain storeState() and getState() function calls
                        8. Keep the interactive compatible with SLS integration
                        
                        Apply the requested changes while preserving the xAPI learning analytics functionality.
                        Update the "readme" markdown to reflect the changes made to the interactive.
                    `;
                } else {
                    fullPrompt = `
                        You are refining an existing interactive HTML file.
                        Your task is to modify the provided HTML based on the user's new instructions and generate an updated JSON object containing the new "html" and an updated "readme".
                        
                        USER'S REFINEMENT INSTRUCTIONS:
                        ---
                        ${refinementPrompt}
                        ---

                        PREVIOUS HTML CODE TO REFINE:
                        ---
                        ${existingHtml}
                        ---

                        Please apply the changes and ensure the new HTML remains a single, self-contained file.
                        Also, update the "readme" markdown to reflect the changes made to the interactive.
                        Maintain the footer and Google Analytics script as they were, with the author "${username}" and URL "${resourceURL}".
                    `;
                }
            } else {
                // This is an initial generation request
                if (recipe.id === 'xapi-prototype') {
                    fullPrompt = `
                        You are creating an xAPI-enabled educational interactive based on the provided template.
                        
                        IMPORTANT: Use this exact HTML structure as your base template:
                        
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>HTML5 Interactive</title>
                          <script src="xapiwrapper.min.js"></script>
                          <script src="index.js" defer></script>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              height: 100vh;
                              margin: 0;
                              background-color: #f0f0f0;
                              overflow: hidden;
                            }
                            .container {
                              background: white;
                              padding: 10px;
                              border-radius: 8px;
                              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                              width: 590px;
                              height: 470px;
                              overflow: auto;
                            }
                            .center { text-align: center; }
                            input, select, button {
                              margin: 5px;
                              padding: 6px;
                              font-size: 14px;
                              border: 1px solid #ccc;
                              border-radius: 4px;
                            }
                            button {
                              background-color: #28a745;
                              color: white;
                              cursor: pointer;
                              border: none;
                            }
                            button:hover { background-color: #218838; }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <!-- Your educational content goes here -->
                          </div>
                          
                          <script>
                            // Your xAPI tracking code goes here
                            // Use storeState() to save data
                            // Use getState() to retrieve data
                            // Track all user interactions for learning analytics
                          </script>
                        </body>
                        </html>

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        CRITICAL REQUIREMENTS:
                        1. Keep the exact HTML structure with xapiwrapper.min.js and index.js includes
                        2. Use the existing CSS styling framework
                        3. Add your educational content inside the .container div
                        4. Implement xAPI tracking using storeState() and getState() functions
                        5. Track ALL user interactions (clicks, answers, time spent)
                        6. Record correct/incorrect responses for analytics
                        7. The interactive must work with SLS integration
                        8. DO NOT modify the xAPI wrapper or index.js functionality
                        9. Focus on educational value and comprehensive analytics
                        
                        The xAPI functions available:
                        - storeState(data) - saves learning data
                        - getState() - retrieves saved data
                        - updateStore() - updates the current state
                        
                        Create an engaging educational interactive that records detailed learning analytics.
                    `;
                } else {
                    fullPrompt = `
                        Recipe Type: ${recipe.title}

                        User Instructions:
                        ---
                        ${userPrompt}
                        ---

                        Additional Requirements for the HTML:
                        - Add this Google Analytics script inside the <head> tag:
                        <script async="true" src="https://www.googletagmanager.com/gtag/js?id=G-S9EWRY1CPJ"></script>
                        <script>
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', 'G-S9EWRY1CPJ');
                        </script>

                        - Add this footer to the bottom of the HTML body. Style it to be subtle, dark-themed, and not intrusive (e.g., small, centered, gray text):
                        <footer>
                          <p>Made by ${username}, using Claude 3.5 Sonnet. For more resources, visit: <a href="${resourceURL}" target="_blank" style="color: inherit;">${resourceURL}</a></p>
                        </footer>
                    `;
                }
            }

            try {
                const messages: any[] = [
                    { role: 'user', content: `${SYSTEM_PROMPT}\n\n${fullPrompt}` }
                ];

                // Add image if provided
                if (imageBase64 && imageMimeType) {
                    messages[0].content = [
                        { type: 'text', text: `${SYSTEM_PROMPT}\n\n${fullPrompt}` },
                        { 
                            type: 'image', 
                            source: {
                                type: 'base64',
                                media_type: imageMimeType,
                                data: imageBase64
                            }
                        }
                    ];
                }

                const response = await fetch('/api/claude', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: messages,
                        model: 'claude-3-5-sonnet-20241022',
                        max_tokens: 4000,
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    throw new Error(`Backend proxy error: ${response.status}`);
                }

                const data = await response.json();
                const content = data.content?.[0]?.text;

                if (!content) {
                    throw new Error("Claude returned an empty response");
                }

                // Extract JSON from Claude's response (it might include extra text)
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error("Could not find JSON in Claude's response");
                }

                const result = JSON.parse(jsonMatch[0]);
                
                if (typeof result.html !== 'string' || typeof result.readme !== 'string') {
                    throw new Error("Invalid JSON structure received from Claude. Missing 'html' or 'readme' properties.");
                }

                return result;

            } catch (error) {
                console.error("Error calling Claude via backend proxy:", error);
                if (error instanceof Error) {
                    throw new Error(`Claude API error: ${error.message}`);
                }
                throw new Error("An error occurred while generating content with Claude.");
            }
        }
        default:
            throw new Error(`Unsupported model selected: ${model}`);
    }
};
