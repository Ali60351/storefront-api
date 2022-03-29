import express, { Request, Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'

import userRoutes from './handlers/store_user';
import productRoutes from './handlers/product';
import productOrderRoutes from './handlers/product_order';
import cartRoutes from './handlers/cart';
import userOrderRoutes from './handlers/user_order';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user-order', userOrderRoutes);
app.use('/api/product-order', productOrderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
