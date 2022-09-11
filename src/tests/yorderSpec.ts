import supertest from 'supertest'
import app from '../server'
import { Order, ordersStore } from '../models/order'
import jwt from 'jsonwebtoken'


const Request = supertest(app);

describe('Testing Endpoints of orders', () => {
    it('get the / endpoint',async () => {
        const Response = await Request.get('/')
        expect(Response.status).toBe(200)
    });

    const orderId: string = '1'
    const productId: string = '1'
    const quantity: number = 1
    const token = jwt.sign({ orderId, productId, quantity }, process.env.TOKEN_SECRET as unknown as string)
    
    it('post new order on endpoint /orders/:id/products', async () => {
      const Response = await Request.post('/orders/:id/products')
      .send({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
        token: token
      })
    })

    it('gets all orders api endpoint', async () => {
      const res = await Request
        .get('/orders')
        .send({
          token: token
        })
        .set('Authorization', 'Bearer ' + process.env.TOKEN_SECRET)
      expect(res.status).toBe(200);
    });

    it('gets one order Endpoint', async () => {
      const res = await Request
        .get('/orders')
        .send({id: '1', token: token})
      expect(res.status).toBe(200);
    });
})

const store = new ordersStore()

describe('Order model', () => {
    describe('1.functions should be defined:', () => {
        it('should have an orederProduct method', () => {
            expect(store.orderProduct).toBeDefined();
        });
    describe('2.functions should return the output:', () => {
        
          it('add new order', async () => {
              const result = await store.orderProduct(1, '1', '1');
              expect(result.quantity).toEqual(1)
          })
          
          
      })
    
    });

    
    
})