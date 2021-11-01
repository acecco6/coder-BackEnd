CREATE SCHEMA `ecommerce_coderhouse`;
CREATE TABLE ecommerce_coderhouse.productos(
    `id` int auto_increment,
    `name` varchar(45) not null,
    `description` varchar(255) not null,
    `code` varchar(8) not null,
    `image` varchar(255) not null,
    `price` int,
    `stock` int,
);
CREATE TABLE ecommerce_coderhouse.cart(
        `id` int auto_increment,
    `timestamp` DATE,
    `products` DATE,
    primary key(`id`)
);
