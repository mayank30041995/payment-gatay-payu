const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const orderRoutes = require('./src/routes/order.routes')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use('/api/payu', orderRoutes)
// app.post('/api/payu/hash', (req, res) => {
//   console.log('gfgfgfklgkl', req.body)
//   res.send(req.body)
// })

module.exports = app
