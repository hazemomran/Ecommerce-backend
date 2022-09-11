import client from "../database";
import bcrypt from 'bcrypt';

export type product = {
    
    name: string;
    description: string;
    price: number;
}

export class productStore {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err) {
            throw new Error(`could not find products. Error: ${err}`)
        }
    }

    async create(u: product): Promise<product> {
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [u.name, u.description, u.price])
            const thisProduct = result.rows[0]
            conn.release()
            return thisProduct
        }catch(err) {
            throw new Error(`could not add this product. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<product> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM products WHERE ID=($1)'
            const result = await conn.query(sql, [id])
            const thisProduct = result.rows[0]
            conn.release()
            return thisProduct
        }catch(err) {
            throw new Error(`could not delete this product. Error: ${err}`)
        }
    }

    async show(id: string): Promise<product> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE ID=($1)'
            const result = await conn.query(sql, [id])
            const thisProduct = result.rows[0]
            conn.release()
            return thisProduct
        }catch(err) {
            throw new Error(`could not find this product. Error: ${err}`)
        }
    }

   
}