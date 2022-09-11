"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new product_1.productStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const thisProduct = await store.show(req.body.id);
        res.json(thisProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const myProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };
        try {
            jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401);
            res.json(`Invalid token: ${err}`);
            return;
        }
        const thisUser = await store.create(myProduct);
        res.json(myProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        try {
            jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401);
            res.json(`Invalid token: ${err}`);
            return;
        }
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products', destroy);
};
exports.default = product_routes;
