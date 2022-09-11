
## API Endpoints
#### Products
- return all the products:
    HTTP verb: GET 
    Endpoint: /products
- return one product:
    HTTP verb: GET 
    Endpoint: /products
- Create new product:
    HTTP verb: POST
    Endpoint: /products
- Delete a product:
    HTTP verb: DELETE
    Endpoint: /products

#### Users
- return all the users:
    HTTP verb: GET 
    Endpoint: /users
- Show one user:
    HTTP verb: GET 
    Endpoint: /users
- Create new user:
    HTTP verb: POST
    Endpoint: /users
- Delete a user:
    HTTP verb: DELETE
    Endpoint: /users

#### Orders
- Add order
    HTTP verb: POST
    Endpoint: /order/:id/products


## Data Shapes
#### Product
-  id
- name
- description
- price

#### User
- id
- username
- email
- password

#### Orders
- id
- quantity of each product in the order
- productId
- userId
- status of order (active or complete)

### orderProducts
- id
- quantity
- orderId
- productId


## Database schema

# Table "users":
  Column  |          Type          | Collation | Nullable |              Default
----------+------------------------+-----------+----------+-----------------------------------
 id       | integer                |           | not null | nextval('users_id_seq'::regclass)
 username | character varying(100) |           | not null |
 email    | character varying      |           | not null |
 password | character varying      |           | not null |
 credit   | money                  |           |          |

# Table "products":
   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 name        | character varying(255) |           | not null |
 description | text                   |           |          |
 price       | money                  |           | not null |

# Table "orders":
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(64) |           |          |
 user_id | bigint                |           |          |


# Table "orderproducts":
  Column   |  Type   | Collation | Nullable |                  Default
-----------+---------+-----------+----------+-------------------------------------------
 id        | integer |           | not null | nextval('orderproducts_id_seq'::regclass)
 quatity   | integer |           |          |
 orderid   | bigint  |           |          |
 productid | bigint  |           |          |