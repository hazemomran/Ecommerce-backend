CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    credit MONEY
);