"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Request = (0, supertest_1.default)(server_1.default);
describe('Testing Endpoints of users', () => {
    it('get the / endpoint', async () => {
        const Response = await Request.get('/');
        expect(Response.status).toBe(200);
    });
    const myUser = {
        username: 'hazem_Omrann',
        email: 'ha1452003@gmail.com',
        password: '1234abcd',
        credit: 0
    };
    const token = jsonwebtoken_1.default.sign({ myUser }, process.env.TOKEN_SECRET);
    it('create user by /users endpoint', async () => {
        const Response = await Request.post('/users')
            .send(myUser);
        expect(Response.status).toBe(200);
    });
    it('gets all users api endpoint', async () => {
        const res = await Request.get('/users')
            .send({ token: token });
        expect(res.status).toBe(200);
    });
    it('gets one user Endpoint', async () => {
        const res = await Request
            .get('/users')
            .send({ id: '1', token: token });
        expect(res.status).toBe(200);
    });
});
const store = new user_1.userStore();
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
            expect(result.username).toEqual('hazem_Omrann');
            expect(result.email).toEqual('ha1452003@gmail.com');
            expect(bcrypt_1.default.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result.password)).toBeTruthy();
        });
        it('index method should return a list of users', async () => {
            const result = await store.index();
            expect(result[0].username).toEqual('hazem_Omrann');
            expect(result[0].email).toEqual('ha1452003@gmail.com');
            expect(bcrypt_1.default.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result[0].password)).toBeTruthy();
        });
        it('show method should return the correct user', async () => {
            const result = await store.show("1");
            expect(result.username).toEqual('hazem_Omrann');
            expect(result.email).toEqual('ha1452003@gmail.com');
            expect(bcrypt_1.default.compareSync('1234abcd' + process.env.BCRYPT_PASSWORD, result.password)).toBeTruthy();
        });
    });
});
