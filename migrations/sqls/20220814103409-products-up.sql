CREATE TABLE products (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price MONEY NOT NULL
);