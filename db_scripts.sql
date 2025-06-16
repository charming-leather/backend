CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE PROCEDURE GetAllUsers()
BEGIN
SELECT id, name, email, created_at FROM users;
END

CREATE PROCEDURE GetUserByEmail(IN userEmail VARCHAR(255))
BEGIN
SELECT * FROM users WHERE email = userEmail LIMIT 1;
END

CREATE PROCEDURE AddUser(
    IN p_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
INSERT INTO users (name, email, password, created_at)
VALUES (p_name, p_email, p_password, NOW());
END