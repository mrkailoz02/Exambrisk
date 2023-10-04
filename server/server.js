// Set up about express or const
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(cors())

const listRouter = require('./routes/listRoute')

app.use('/api/list', listRouter);

app.listen(port, (req, res) => {
    console.log(`Http server run at ${port}`)
})