import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'

import userRoutes from './handlers/store_user';
import productRoutes from './handlers/product';
import productOrderRoutes from './handlers/product_order';
import cartRoutes from './handlers/cart';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/product-order', productOrderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
