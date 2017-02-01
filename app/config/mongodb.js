'use strict'

const path = require('path')
const fs = require('fs')
const rootPath = path.join(__dirname, '/..')
const mongoose = require('mongoose')

module.exports = (mongoHostUrl) => {
  mongoose.Promise = global.Promise

  const options = {
    server: {
      socketOptions: {
        keepAlive: 120,
        // poolSize:5,
        connectTimeoutMS: 300000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 120,
        // poolSize:5,
        connectTimeoutMS: 300000
      }
    }
  }

  mongoose.connect(mongoHostUrl, options, (err, res) => {
    if (err) {
      console.error('Error connecting to the database. ', err)
    } else {
      const conn = mongoose.connection

      // Error handler
      conn.on('error', (err) => {
        if (err) console.error('✗ MongoDB Connection to ' + mongoHostUrl + ' is Error. Please make sure MongoDB is running. -> ' + err)
      })

      let gracefulExit = () => {
        conn.close(function () { process.exit(0) })
      }

      // If the Node process ends, close the Mongoose connection
      process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)
    }
  })

  fs.readdirSync(rootPath + '/models')
    .filter(file => ~file.indexOf('.js'))
    .forEach(file => {
      require(path.join(rootPath + '/models', file))
    })

  return mongoose
}
