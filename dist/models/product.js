"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`could not find products. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [u.name, u.description, u.price]);
            const thisProduct = result.rows[0];
            conn.release();
            return thisProduct;
        }
        catch (err) {
            throw new Error(`could not add this product. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM products WHERE ID=($1)';
            const result = await conn.query(sql, [id]);
            const thisProduct = result.rows[0];
            conn.release();
            return thisProduct;
        }
        catch (err) {
            throw new Error(`could not delete this product. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE ID=($1)';
            const result = await conn.query(sql, [id]);
            const thisProduct = result.rows[0];
            conn.release();
            return thisProduct;
        }
        catch (err) {
            throw new Error(`could not find this product. Error: ${err}`);
        }
    }
}
exports.productStore = productStore;
