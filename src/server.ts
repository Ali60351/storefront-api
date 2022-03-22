import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'

import userRoutes from './handlers/store_user';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
