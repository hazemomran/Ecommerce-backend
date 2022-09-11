import supertest from 'supertest'
import app from '../server'
import { product, productStore } from '../models/product';
import jwt from 'jsonwebtoken'


const Request = supertest(app);

describe('Testing Endpoints of products', () => {
    it('get the / endpoint',async () => {
        const Response = await Request.get('/')
        expect(Response.status).toBe(200)
    });
    const myProduct: product = {
        name: 'iphone',
        description: 'A smatphone',
        price: 0
    }
    const token = jwt.sign({ myProduct }, process.env.TOKEN_SECRET as unknown as string)

    it('create product by /products endpoint',async () => {
        const Response = await Request.post('/products')
        .send({
            name: 'iphone',
            description: 'A smatphone',
            price: 0,
            token: token
        })
        .set('Authorization', 'Bearer ' + process.env.TOKEN_SECRET);
        expect(Response.status).toBe(200)
    });

    it('gets all products api endpoint', async () => {
        const res = await Request
          .get('/products')
          .set('Authorization', 'Bearer ' + process.env.TOKEN_SECRET);
        expect(res.status).toBe(200);
      });

      it('gets one product Endpoint', async () => {
        const res = await Request
          .get('/products')
          .send('1')
        expect(res.status).toBe(200);
      });

    
})

const store = new productStore()

describe('product model', () => {
    describe('1.functions should be defined:', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
    
        it('should have an create method', () => {
            expect(store.create).toBeDefined();
        });
    
        it('should have an show method', () => {
            expect(store.show).toBeDefined();
        });
    
        it('should have an delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });

    describe('2.functions should return the output:', () => {
        it('create method should add a product', async () => {
            const result = await store.create({
                name: 'iphone',
                description: 'A smatphone',
                price: 1000
            });
            expect(result.name).toEqual('iphone')
            expect(result.description).toEqual('A smatphone')

        })

        it('index method should return a list of products', async () => {
            const result = await store.index();
            expect(result[0].name).toEqual('iphone')
            expect(result[0].description).toEqual('A smatphone')
          });

          it('show method should return the correct product', async () => {
            const result = await store.show("1");
            expect(result.name).toEqual('iphone')
            expect(result.description).toEqual('A smatphone')
          });

          
        
    })
    
})