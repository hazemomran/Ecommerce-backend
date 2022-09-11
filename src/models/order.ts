import client from "../database";
export type Order = {
    id: string,
    quantity: number,
    orderId: string,
    productId: string

}

export class ordersStore {
  async index(): Promise<Order[]> {
    try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }catch(err) {
        throw new Error(`could not find orders. Error: ${err}`)
    }
}



async show(id: string): Promise<Order> {
    try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders WHERE ID=($1)'
        const result = await conn.query(sql, [id])
        const thisOrder = result.rows[0]
        conn.release()
        return thisOrder
    }catch(err) {
        throw new Error(`could not find this order. Error: ${err}`)
    }
}

  async orderProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
          
      try {
        const conn = await client.connect()
        const sql = 'INSERT INTO orderProducts (quantity, orderId, productId) VALUES($1, $2, $3) RETURNING *'
        const result = await conn.query(sql, [quantity, orderId, productId])
        const order = result.rows[0]
        conn.release()
        return order
        }catch(err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
      }
    }
}