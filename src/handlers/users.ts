import express, { json, Request, Response } from 'express'
import { user, userStore } from '../models/user'
import jwt from 'jsonwebtoken'

const store = new userStore()

const index = async (req: Request, res: Response) => {
    try {
        try {
            jwt.verify(req.body.token, process.env.TOKEN_SECRET as string)
        } catch (err) {
            res.status(401)
            res.json(`Invalid token: ${err}`)
            return
        }
        const users = await store.index()
        res.json(users)
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
        const thisUser = await store.show(req.body.id)
    res.json(thisUser)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        const myUser: user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            credit: 0
        }
    const thisUser = await store.create(myUser)
    const token = jwt.sign({ myUser: thisUser}, process.env.TOKEN_SECRET as unknown as string)
    res.json(token)
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



const user_routes = (app: express.Application) => {
    
    app.get('/users',json(), index)
    app.get('/users/:id', show)
    app.post('/users',json(), create)
    app.delete('/users', destroy)
}

export default user_routes;