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

ALTER TABLE auth_events
MODIFY event_type ENUM('account_created','login','logout','login_failed','password_reset','teacher_pending','teacher_approved') NOT NULL;

ALTER TABLE users
MODIFY role ENUM('student','pending_teacher','teacher','parent','admin') NOT NULL DEFAULT 'student';

ALTER TABLE users
ADD COLUMN IF NOT EXISTS email VARCHAR(190) NULL UNIQUE,
ADD COLUMN IF NOT EXISTS email_verified_at DATETIME NULL,
ADD COLUMN IF NOT EXISTS teacher_domain_approved TINYINT(1) NOT NULL DEFAULT 0;

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
