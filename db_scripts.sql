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


-- Customers
DELIMITER //

CREATE PROCEDURE GetAllCustomers()
BEGIN
    SELECT customer_id, name, email, phone FROM customers;
END //

CREATE PROCEDURE GetCustomerById(IN p_customer_id INT)
BEGIN
    SELECT * FROM customers WHERE customer_id = p_customer_id LIMIT 1;
END //

CREATE PROCEDURE AddCustomer(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_address TEXT
)
BEGIN
    INSERT INTO customers (name, email, phone, address)
    VALUES (p_name, p_email, p_phone, p_address);
END //

CREATE PROCEDURE UpdateCustomer(
    IN p_customer_id INT,
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20)
)
BEGIN
    UPDATE customers
    SET name = p_name,
        email = p_email,
        phone = p_phone
    WHERE customer_id = p_customer_id;
END //

CREATE PROCEDURE DeleteCustomer(IN p_customer_id INT)
BEGIN
    DELETE FROM customers WHERE customer_id = p_customer_id;
END //

DELIMITER ;


-- payments
DELIMITER //

CREATE PROCEDURE GetAllPayments()
BEGIN
    SELECT payment_id, order_id, payment_method, amount, payment_date FROM payments;
END //

CREATE PROCEDURE GetPaymentById(IN p_payment_id INT)
BEGIN
    SELECT * FROM payments WHERE payment_id = p_payment_id LIMIT 1;
END //

CREATE PROCEDURE AddPayment(
    IN p_order_id INT,
    IN p_payment_method VARCHAR(50),
    IN p_amount DECIMAL(10,2)
)
BEGIN
    INSERT INTO payments (order_id, payment_method, amount, payment_date)
    VALUES (p_order_id, p_payment_method, p_amount, NOW());
END //

CREATE PROCEDURE UpdatePayment(
    IN p_payment_id INT,
    IN p_payment_method VARCHAR(50),
    IN p_amount DECIMAL(10,2)
)
BEGIN
    UPDATE payments
    SET payment_method = p_payment_method,
        amount = p_amount
    WHERE payment_id = p_payment_id;
END //

CREATE PROCEDURE DeletePayment(IN p_payment_id INT)
BEGIN
    DELETE FROM payments WHERE payment_id = p_payment_id;
END //

DELIMITER ;
-- 1. Create the Customers table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    address TEXT
); 

-- 2. Create the Products table
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(150),
    description TEXT,
    price DECIMAL(10, 2),
    stock_quantity INT
);

-- 3. Create the CustomerOrders table
CREATE TABLE CustomerOrders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    total_amount DECIMAL(10, 2),
    payment_method VARCHAR(50),
    shipping_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- 4. Create the OrderItems table
CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price_per_unit DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES CustomerOrders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
