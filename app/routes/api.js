/* global IndexControllers */

'use strict'

const Express = require('express')
const Route = Express.Router()

Route
  .get('/', IndexControllers.index)

module.exports = Route
