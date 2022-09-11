import express, { Request, Response } from 'express'
import { product, productStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new productStore()

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index()
        res.json(products)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const thisProduct = await store.show(req.body.id)
        res.json(thisProduct)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        const myProduct: product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
    const thisUser = await store.create(myProduct)
    res.json(myProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const product_routes = (app: express.Application) => {
    
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.delete('/products', destroy)
}

export default product_routes;