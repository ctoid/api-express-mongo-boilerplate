'use strict'
require('dotenv').config()

global.env = process.env.NODE_ENV || 'development'
global.CONFIG = require('./app/config')
global.db = require('./app/config/mongodb')(CONFIG.MONGODB_HOST)

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const autoload = require('./autoload')()

autoload((err, result) => {
  if (err) throw err

  require('./app/config/express')(app)

  db.connection.on('connected', () => {
    server.listen(CONFIG.SERVER.port, () => {
      if (env === 'development') {
        console.log('\n✔ Apps is runing on %s in %s mode', CONFIG.SERVER.hostname + ':' + CONFIG.SERVER.port, env)
      }
    })
  })
})

module.exports.server = server
module.exports.db = db
