CREATE TABLE orders (
    ID SERIAL PRIMARY KEY,
    status VARCHAR(64),
    user_id bigint REFERENCES users(ID)
);
