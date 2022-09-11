CREATE TABLE orderProducts (
    ID SERIAL PRIMARY KEY,
    quantity integer,
    orderId bigint REFERENCES orders(ID),
    productId bigint REFERENCES products(ID)
);