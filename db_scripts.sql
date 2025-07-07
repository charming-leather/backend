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

-- A
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100)
);

CREATE TABLE stock (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity_available INT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    order_type VARCHAR(50), -- lay by, order
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2), -- unit price at time of order
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    amount DECIMAL(10,2),
    reference_number VARCHAR(100) UNIQUE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

INSERT INTO Customers (first_name, last_name, email, phone, address) VALUES
('John', 'Smith', 'john.smith@example.com', '0612345678', '12 Oak Street'),
('Emma', 'Johnson', 'emma.johnson@example.com', '0723456789', '34 Pine Avenue'),
('Liam', 'Williams', 'liam.williams@example.com', '0834567890', '56 Cedar Road'),
('Olivia', 'Brown', 'olivia.brown@example.com', '0745678901', '78 Birch Street'),
('Noah', 'Jones', 'noah.jones@example.com', '0656789012', '90 Palm Avenue'),
('Ava', 'Miller', 'ava.miller@example.com', '0667890123', '21 Elm Street'),
('James', 'Davis', 'james.davis@example.com', '0678901234', '43 Spruce Lane'),
('Sophia', 'Garcia', 'sophia.garcia@example.com', '0789012345', '65 Fir Street'),
('Benjamin', 'Martinez', 'ben.martinez@example.com', '0690123456', '87 Walnut Road'),
('Isabella', 'Rodriguez', 'isa.rodriguez@example.com', '0601234567', '109 Maple Drive'),
('Ethan', 'Wilson', 'ethan.wilson@example.com', '0712345678', '11 Willow Way'),
('Mia', 'Anderson', 'mia.anderson@example.com', '0823456789', '22 Ash Street'),
('Lucas', 'Thomas', 'lucas.thomas@example.com', '0734567890', '33 Poplar Avenue'),
('Amelia', 'Taylor', 'amelia.taylor@example.com', '0645678901', '44 Acacia Road'),
('Logan', 'Moore', 'logan.moore@example.com', '0856789012', '55 Sycamore Street'),
('Harper', 'Jackson', 'harper.jackson@example.com', '0767890123', '66 Jacaranda Lane'),
('Jacob', 'White', 'jacob.white@example.com', '0878901234', '77 Baobab Street'),
('Evelyn', 'Harris', 'evelyn.harris@example.com', '0689012345', '88 Cypress Road'),
('Elijah', 'Clark', 'elijah.clark@example.com', '0790123456', '99 Olive Avenue'),
('Abigail', 'Lewis', 'abigail.lewis@example.com', '0801234567', '100 Oakwood Drive'),
('Daniel', 'Lee', 'daniel.lee@example.com', '0612340987', '12 Magnolia Street'),
('Emily', 'Walker', 'emily.walker@example.com', '0723451098', '34 Ebony Avenue'),
('Matthew', 'Hall', 'matthew.hall@example.com', '0834562109', '56 Ironwood Road'),
('Ella', 'Allen', 'ella.allen@example.com', '0745673210', '78 Coral Street'),
('Sebastian', 'Young', 'seb.young@example.com', '0656784321', '90 Sapphire Avenue'),
('Avery', 'King', 'avery.king@example.com', '0667895432', '21 Crystal Drive'),
('Jack', 'Wright', 'jack.wright@example.com', '0678906543', '43 Ruby Lane'),
('Scarlett', 'Scott', 'scarlett.scott@example.com', '0789017654', '65 Amber Road'),
('Henry', 'Green', 'henry.green@example.com', '0690128765', '87 Jade Street'),
('Grace', 'Adams', 'grace.adams@example.com', '0601239876', '109 Pearl Avenue'),
('Wyatt', 'Baker', 'wyatt.baker@example.com', '0712340987', '11 Moonlight Way'),
('Chloe', 'Gonzalez', 'chloe.gonzalez@example.com', '0823451098', '22 Starlight Street'),
('Gabriel', 'Nelson', 'gabe.nelson@example.com', '0734562109', '33 Sunrise Drive'),
('Victoria', 'Carter', 'vic.carter@example.com', '0645673210', '44 Sunset Lane'),
('Jayden', 'Mitchell', 'jayden.mitchell@example.com', '0856784321', '55 Rainbow Street'),
('Riley', 'Perez', 'riley.perez@example.com', '0767895432', '66 Cloud Avenue'),
('David', 'Roberts', 'david.roberts@example.com', '0878906543', '77 Thunder Road'),
('Aria', 'Turner', 'aria.turner@example.com', '0689017654', '88 Lightning Lane'),
('Joseph', 'Phillips', 'joseph.phillips@example.com', '0790128765', '99 Breeze Avenue'),
('Lily', 'Campbell', 'lily.campbell@example.com', '0801239876', '100 Meadow Drive'),
('Samuel', 'Parker', 'sam.parker@example.com', '0612341122', '12 Forest Street'),
('Nora', 'Evans', 'nora.evans@example.com', '0723452233', '34 Lake Avenue'),
('Owen', 'Edwards', 'owen.edwards@example.com', '0834563344', '56 River Road'),
('Hannah', 'Collins', 'hannah.collins@example.com', '0745674455', '78 Hill Street'),
('Leo', 'Stewart', 'leo.stewart@example.com', '0656785566', '90 Valley Avenue'),
('Zoey', 'Sanchez', 'zoey.sanchez@example.com', '0667896677', '21 Ocean Drive'),
('Julian', 'Morris', 'julian.morris@example.com', '0678907788', '43 Desert Lane'),
('Lillian', 'Rogers', 'lillian.rogers@example.com', '0789018899', '65 Rain Road'),
('Hudson', 'Reed', 'hudson.reed@example.com', '0690129900', '87 Wind Street'),
('Ellie', 'Cook', 'ellie.cook@example.com', '0601230011', '109 Flame Avenue'),
('Grayson', 'Morgan', 'grayson.morgan@example.com', '0712341122', '11 Storm Way'),
('Layla', 'Bell', 'layla.bell@example.com', '0823452233', '22 Sand Street'),
('Isaac', 'Murphy', 'isaac.murphy@example.com', '0734563344', '33 Shell Drive'),
('Penelope', 'Bailey', 'penelope.bailey@example.com', '0645674455', '44 Beach Lane'),
('Anthony', 'Rivera', 'anthony.rivera@example.com', '0856785566', '55 Palm Road'),
('Camila', 'Cooper', 'camila.cooper@example.com', '0767896677', '66 Cedar Avenue'),
('Dylan', 'Richardson', 'dylan.richardson@example.com', '0878907788', '77 Hazel Street'),
('Zoe', 'Cox', 'zoe.cox@example.com', '0689018899', '88 Ivy Lane'),
('Nathan', 'Howard', 'nathan.howard@example.com', '0790129900', '99 Rosewood Drive'),
('Stella', 'Ward', 'stella.ward@example.com', '0801230011', '100 Pineview Road'),
('Aaron', 'Torres', 'aaron.torres@example.com', '0612341234', '12 Lilac Street'),
('Natalie', 'Peterson', 'natalie.peterson@example.com', '0723452345', '34 Marigold Avenue'),
('Andrew', 'Gray', 'andrew.gray@example.com', '0834563456', '56 Lavender Road'),
('Hazel', 'Ramirez', 'hazel.ramirez@example.com', '0745674567', '78 Hibiscus Street'),
('Thomas', 'James', 'thomas.james@example.com', '0656785678', '90 Protea Avenue'),
('Aurora', 'Watson', 'aurora.watson@example.com', '0667896789', '21 Tulip Drive'),
('Charles', 'Brooks', 'charles.brooks@example.com', '0678907890', '43 Daisy Lane'),
('Savannah', 'Kelly', 'savannah.kelly@example.com', '0789018901', '65 Poppy Road'),
('Christopher', 'Sanders', 'chris.sanders@example.com', '0690129012', '87 Sunflower Street'),
('Violet', 'Price', 'violet.price@example.com', '0601230123', '109 Jasmine Avenue'),
('Jaxon', 'Bennett', 'jaxon.bennett@example.com', '0712341234', '11 Garden Way'),
('Claire', 'Wood', 'claire.wood@example.com', '0823452345', '22 Orchard Street'),
('Levi', 'Barnes', 'levi.barnes@example.com', '0734563456', '33 Grove Drive'),
('Lucy', 'Ross', 'lucy.ross@example.com', '0645674567', '44 Fern Lane'),
('Isaiah', 'Henderson', 'isaiah.henderson@example.com', '0856785678', '55 Ivy Street'),
('Eleanor', 'Coleman', 'eleanor.coleman@example.com', '0767896789', '66 Vine Avenue'),
('Hunter', 'Jenkins', 'hunter.jenkins@example.com', '0878907890', '77 Aloe Road'),
('Luna', 'Perry', 'luna.perry@example.com', '0689018901', '88 Palm Ridge'),
('Christian', 'Powell', 'christian.powell@example.com', '0790129012', '99 Hilltop Drive'),
('Paisley', 'Long', 'paisley.long@example.com', '0801230123', '100 Stoneview Avenue');

SELECT * FROM customers;
DESCRIBE customers;
SELECT * FROM products;
SELECT * FROM stock;
SELECT * FROM orders;
SELECT * FROM payments;
SELECT orders.order_id, customers.name
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id;

SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM stock;

SELECT orders.order_id, customers.name
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id;

SELECT * FROM customers
WHERE name LIKE '%Scarlett%';

UPDATE customers
SET phone = '071-459-2688'
WHERE customer_id = 1;

UPDATE customers
SET name = 'John A. Doe',
    email = 'johnadoe@gmail.com'
WHERE customer_id = 1;

SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;

SELECT c.customer_id, c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;