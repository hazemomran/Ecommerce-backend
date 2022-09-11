"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Request = (0, supertest_1.default)(server_1.default);
describe('Testing Endpoints of orders', () => {
    it('get the / endpoint', async () => {
        const Response = await Request.get('/');
        expect(Response.status).toBe(200);
    });
    const orderId = '1';
    const productId = '1';
    const quantity = 1;
    const token = jsonwebtoken_1.default.sign({ orderId, productId, quantity }, process.env.TOKEN_SECRET);
    it('post new order on endpoint /orders/:id/products', async () => {
        const Response = await Request.post('/orders/:id/products')
            .send({
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            token: token
        });
    });
    it('gets all orders api endpoint', async () => {
        const res = await Request
            .get('/orders')
            .send({
            token: token
        })
            .set('Authorization', 'Bearer ' + process.env.TOKEN_SECRET);
        expect(res.status).toBe(200);
    });
    it('gets one order Endpoint', async () => {
        const res = await Request
            .get('/orders')
            .send({ id: '1', token: token });
        expect(res.status).toBe(200);
    });
});
const store = new order_1.ordersStore();
describe('Order model', () => {
    describe('1.functions should be defined:', () => {
        it('should have an orederProduct method', () => {
            expect(store.orderProduct).toBeDefined();
        });
        describe('2.functions should return the output:', () => {
            it('add new order', async () => {
                const result = await store.orderProduct(1, '1', '1');
                expect(result.quantity).toEqual(1);
            });
        });
    });
});
