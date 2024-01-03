-- migrate:up
CREATE TABLE loginadmin (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(100),
    `password` varchar(255),
    `role` varchar(100),
    `refreshToken` varchar(255)
);

CREATE TABLE product (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255),
    `price` varchar(100),
    `img` varchar(255),
    `title` varchar(255),
    `category_id` varchar(255),
    `status` varchar(100),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE category (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255),
    `product_id` integer
);

ALTER TABLE `category` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)

-- migrate:down
DROP DATABASE products
