### Database instructions
# CREATE USER
> CREATE USER ecommerce WITH PASSWORD thispass;

# CREATE DATABASE CALLED USERS (main database)
> CREATE DATABASE shop;

# CREATE DATABASE CALLED USERS_TEST (testing database)
> CREATE DATABASE shop_test;

# FOR CREATING THE TABLES RUN THE MIGRATIONS (db-migrate up)

### Informations about the api
1. **PORT NUMBER FOR DB**
> 5432

2. **PORT NUMBER FOR SERVER**
> 8000

3. **ENVIRONMENT VARIABLES**
```s
POSTGRES_HOST=localhost
POSTGRES_DB=shop
POSTGRES_DB_TEST=shop_test
POSTGRES_USER=ecommerce
POSTGRES_PASSWORD=thispass
PORT=5432
ENV=dev
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token
```
4. **PACKAGE INSTALLATION**
- write in the terminal 'yarn add' + these packages:
> express
> db-migrate
> db-migrate-pg
> body-parser
> bcrypt
> dotenv
> pg
> typescript
> jsonwebtoken

- write in the terminal 'yarn add -D' + the pachages (dev dependencies):
> jasmine
> jasmine-spec-reporter
> jasmine-ts
> @types/jasmine
> @types/bcrypt
> supertest
> @types/supertest
> ts-node
> tsc-watch
> @types/jsonwebtoken

5. **SCRIPTS**
```s
"watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
"test": "npx tsc && db-migrate db:drop shop_test && db-migrate db:create shop_test && db-migrate --env test up && tsc && set ENV=test && jasmine && db-migrate db:drop shop_test",
"tsc": "tsc"
```

**NOW YOU ARE READY TO USE THE API**