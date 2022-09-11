import client from "../database";
import bcrypt from 'bcrypt';

export type user = {
    id?: number;
    username: string;
    email: string;
    password: string;
    credit: number;
}

export class userStore {
    async index(): Promise<user[]> {
        try {
            
            const conn = await client.connect()
            console.log('fggf')
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err) {
            throw new Error(`could not find users. Error: ${err}`)
        }
    }

    async create(u: user): Promise<user> {
        try {
            
            const conn = await client.connect()
            
            const sql = 'INSERT INTO users (username, email, password, credit) VALUES ($1, $2, $3, 0) RETURNING *'
            const hash = bcrypt.hashSync(
                u.password + process.env.BCRYPT_PASSWORD, 
                parseInt(process.env.SALT_ROUNDS as string)
             );
            const result = await conn.query(sql, [u.username, u.email, hash])
            const thisUser = result.rows[0]
            conn.release()
            try {
                const conn = await client.connect()
                const sql = 'INSERT INTO orders (status) VALUES ($1) RETURNING *'
                const result = await conn.query(sql, ['false'])
              }catch(err) {
                throw new Error(`couldn't create your cart. Error: ${err}`)
              }
            return thisUser
        }catch(err) {
            throw new Error(`could not add this user. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<user> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const thisUser = result.rows[0]
            conn.release()
            return thisUser
        }catch(err) {
            throw new Error(`could not delete this user. Error: ${err}`)
        }
    }

    async show(id: string): Promise<user> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE ID=($1)'
            const result = await conn.query(sql, [id])
            const thisUser = result.rows[0]
            conn.release()
            return thisUser
        }catch(err) {
            throw new Error(`could not find this user. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<user | null> {
        const conn = await client.connect()
        const sql = 'SELECT password FROM users WHERE username=($1)'
        const result = await conn.query(sql, [username])

        if(result.rows.length) {
            const user = result.rows[0]
            console.log(user)
            if(bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                return user
            }
        }
        conn.release()
        return null
    }
}