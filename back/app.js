const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rutas
const routes = require('./routes')

//middleware
app.use('/api', routes)

module.exports = app;