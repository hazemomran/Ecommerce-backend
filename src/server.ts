import express, { Request, Response } from 'express'
import bodyParser, { json } from 'body-parser'
import user_routes from './handlers/users'
import product_routes from './handlers/products'
import order_routes from './handlers/orders'

const app: express.Application = express()
const address: string = "localhost:8000"

app.use(bodyParser.json())
app.use(json())

user_routes(app)
product_routes(app)
order_routes(app)



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
    console.log(req.body)
})

app.listen(8000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
