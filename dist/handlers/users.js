"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.userStore();
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
        const users = await store.index();
        res.json(users);
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
        const thisUser = await store.show(req.body.id);
        res.json(thisUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const myUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            credit: 0
        };
        const thisUser = await store.create(myUser);
        const token = jsonwebtoken_1.default.sign({ myUser: thisUser }, process.env.TOKEN_SECRET);
        res.json(token);
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
const user_routes = (app) => {
    app.get('/users', (0, express_1.json)(), index);
    app.get('/users/:id', show);
    app.post('/users', (0, express_1.json)(), create);
    app.delete('/users', destroy);
};
exports.default = user_routes;
