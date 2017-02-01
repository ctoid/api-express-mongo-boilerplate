/* global */

'use strict'

const path = require('path')
const ROOT_PATH = path.join(__dirname, '/../..')
const BASE_DOMAIN = process.env.BASE_DOMAIN || 'cto.id'
const PORT = process.env.PORT_APP || 5001

const config = {
  ROOT: ROOT_PATH,
  BASE_DOMAIN: BASE_DOMAIN,
  SERVER: {
    port: PORT,
    hostname: process.env.HOSTNAME || '127.0.0.1'
  },
  MONGODB_HOST: process.env.MONGODB_HOST,
  redis: {
    apiCache: {
      host: process.env.REDIS_API_CACHE_HOST,
      port: process.env.REDIS_API_CACHE_PORT,
      options: {
        db: 1
      },
      auth_pass: null
    }
  },
  elasticsearch: {
    host: process.env.ELASTICSEARCH_HOST
  },
  SESSION_SECRET: process.env.SESSION_SECRET || 'put your secret key here'
}

module.exports = config
