import express, { Request, Response } from 'express'
import { Order, ordersStore } from '../models/order'
import jwt from 'jsonwebtoken'

const add = new ordersStore()

const index = async (req: Request, res: Response) => {
    try {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
        const orders = await add.index()
        res.json(orders)
    }catch (err) {
        res.status(400)
        res.json(err)
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
        const thisOrder = await add.show(req.body.id)
    res.json(thisOrder)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const addProduct =async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)

    try {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
        const addedProduct = await add.orderProduct(quantity, orderId, productId)
        res.json(addedProduct)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders/:id/products', addProduct)
    
}

export default order_routes;