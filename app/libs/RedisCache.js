'use strict'

const fastStringify = require('fast-safe-stringify')
const JSONparse = require('fast-json-parse')
const redisClient = require('redis-pool-connection')(CONFIG.redis.apiCache)

const redisCache = {
  get: (key, callback) => {
    redisClient.get(key, (err, response) => {
      if (!err && response) {
        var data = JSONparse(response)
        return callback(null, data.value)
      } else {
        return callback(err, null)
      }
    })
  },
  set: (key, data) => {
    redisClient.set(key, fastStringify(data))
  },
  setex: (key, ttl, data) => {
    const expiredTime = ttl || (env === 'production' ? 60 : 5)

    redisClient.setex(key, expiredTime, fastStringify(data))
  },
  del: (key) => {
    redisClient.del(key, (err, res) => {
      if (err) console.error(err)
    })
  }
}

module.exports = redisCache
