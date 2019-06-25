-- if making any changes this will drop it
DROP DATABASE IF EXISTS bamazon_db;

-- create a database called bamazon
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- create a table inside the database called products
CREATE TABLE products (

-- item_id unique id for each product
    id INT NOT NULL AUTO_INCREMENT,

-- product name
product VARCHAR(45) NOT NULL,

-- department_name
department VARCHAR(45) NOT NULL,

-- price 
price DECIMAL(10,2) NOT NULL,

-- stock quantity
stock INT NOT NULL,

-- primary key
    PRIMARY KEY (id)
);

-- add 10 different products
INSERT INTO products (product, department, price, stock)
VALUES("Ray Ban Sunglasses", "Eyewear", 50, 20),
("MacBook Pro", "Electronics", 1500, 10),
("Wireless Mouse", "Electronics", 20, 40),
("Blazer", "Clothes", 50, 25),
("Telescope", "Appliances", 250, 15),
("Phone Charger", "Electronics", 10, 80),
("Slippers", "Clothes", 12, 120),
("Model Car", "Decorations", 35, 20),
("Lamp", "Home & Kitchen", 30, 40),
("Backpack", "Eyewear", 50, 20);

