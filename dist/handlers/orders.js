"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const add = new order_1.ordersStore();
const index = async (req, res) => {
    try {
        try {
            jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401);
            res.json(`Invalid token: ${err}`);
            return;
        }
        const orders = await add.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        try {
            jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401);
            res.json(`Invalid token: ${err}`);
            return;
        }
        const thisOrder = await add.show(req.body.id);
        res.json(thisOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        try {
            jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401);
            res.json(`Invalid token: ${err}`);
            return;
        }
        const addedProduct = await add.orderProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProduct);
};
exports.default = order_routes;
