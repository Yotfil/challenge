const express = require('express');
const controllers = require('./controllers')

const api = express.Router()

api.get('/items', controllers.search)
api.get('/items/:id', controllers.detail)
api.get('/items/:id/description', controllers.description)
api.get('/categories/:id', controllers.category)

module.exports = api;