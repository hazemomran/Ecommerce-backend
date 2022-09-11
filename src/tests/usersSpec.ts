import supertest from 'supertest'
import app from '../server'
import { user, userStore } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import user_routes from '../handlers/users';
import { json } from 'body-parser';
import { tokenToString } from 'typescript';

const Request = supertest(app);

describe('Testing Endpoints of users', () => {
    it('get the / endpoint',async () => {
        const Response = await Request.get('/')
        expect(Response.status).toBe(200)
    });
        const myUser: user = {
            username: 'hazem_Omrann',
            email: 'ha1452003@gmail.com',
            password: '1234abcd',
            credit: 0
        }
        const token = jwt.sign({ myUser }, process.env.TOKEN_SECRET as unknown as string)
    it('create user by /users endpoint',async () => {
        const Response = await Request.post('/users')
        .send(myUser)
        expect(Response.status).toBe(200)
    });
    

    it('gets all users api endpoint', async () => {
        const res = await Request.get('/users')
        .send({token: token})
        expect(res.status).toBe(200);
      });

      it('gets one user Endpoint', async () => {
        const res = await Request
          .get('/users')
          .send({id: '1', token: token})
        expect(res.status).toBe(200);
      });

    
})

const store = new userStore()

describe('User model', () => {
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
        it('create method should add a user', async () => {
            const result = await store.create({
                username: 'hazem_Omrann',
                email: 'ha1452003@gmail.com',
                password: '1234abcd',
                credit: 0
            });
            expect(result.username).toEqual('hazem_Omrann')
            expect(result.email).toEqual('ha1452003@gmail.com')
            expect(bcrypt.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result.password)).toBeTruthy()
        })

        it('index method should return a list of users', async () => {
            const result = await store.index();
            expect(result[0].username).toEqual('hazem_Omrann')
            expect(result[0].email).toEqual('ha1452003@gmail.com')
            expect(bcrypt.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result[0].password)).toBeTruthy()
          });

          it('show method should return the correct user', async () => {
            const result = await store.show("1");
            expect(result.username).toEqual('hazem_Omrann')
            expect(result.email).toEqual('ha1452003@gmail.com')
            expect(bcrypt.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result.password)).toBeTruthy()
          });
        
    })
    
})
