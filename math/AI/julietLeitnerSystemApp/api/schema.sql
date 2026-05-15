CREATE TABLE IF NOT EXISTS classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  join_code VARCHAR(24) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(190) NULL UNIQUE,
  display_name VARCHAR(120) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','pending_teacher','teacher','parent','admin') NOT NULL DEFAULT 'student',
  class_id INT NULL,
  email_verified_at DATETIME NULL,
  teacher_domain_approved TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL,
  CONSTRAINT fk_users_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS game_profiles (
  user_id INT PRIMARY KEY,
  xp INT NOT NULL DEFAULT 0,
  league_name VARCHAR(40) NOT NULL DEFAULT 'Bronze',
  streak INT NOT NULL DEFAULT 0,
  best_streak INT NOT NULL DEFAULT 0,
  daily_goal INT NOT NULL DEFAULT 20,
  last_active_date DATE NULL,
  today_date DATE NULL,
  today_cards INT NOT NULL DEFAULT 0,
  today_correct INT NOT NULL DEFAULT 0,
  today_xp INT NOT NULL DEFAULT 0,
  badges_json JSON NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS card_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  card_id VARCHAR(80) NOT NULL,
  topic VARCHAR(40) NOT NULL,
  milestone INT NOT NULL,
  pack CHAR(1) NOT NULL DEFAULT 'A',
  hint_level INT NOT NULL DEFAULT 3,
  attempts_json JSON NULL,
  common_errors_json JSON NULL,
  last_reviewed DATETIME NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_card (user_id, card_id),
  INDEX idx_user_topic (user_id, topic),
  CONSTRAINT fk_card_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS achievements (
  user_id INT NOT NULL,
  milestone INT NOT NULL,
  achieved_date DATE NOT NULL,
  PRIMARY KEY (user_id, milestone),
  CONSTRAINT fk_achievements_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS records_json (
  user_id INT PRIMARY KEY,
  records JSON NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_records_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attempts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  card_id VARCHAR(80) NULL,
  topic VARCHAR(40) NULL,
  question TEXT NULL,
  answer_given VARCHAR(80) NULL,
  correct TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_attempts_user_date (user_id, created_at),
  CONSTRAINT fk_attempts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS auth_events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  event_type ENUM('account_created','login','logout','login_failed','password_reset','teacher_pending','teacher_approved') NOT NULL,
  display_name VARCHAR(120) NULL,
  username VARCHAR(80) NULL,
  class_code VARCHAR(24) NULL,
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_auth_events_created (created_at),
  INDEX idx_auth_events_user (user_id),
  CONSTRAINT fk_auth_events_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS teacher_actions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  student_id INT NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_teacher_actions_teacher (teacher_id),
  INDEX idx_teacher_actions_student (student_id),
  CONSTRAINT fk_teacher_actions_teacher FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_teacher_actions_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO classes (name, join_code) VALUES ('Demo Class', 'DEMO2026');
