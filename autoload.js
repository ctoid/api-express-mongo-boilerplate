'use strict'
const async = require('async')

const moduleLoader = require('express-module-loader')

module.exports = () => cb => async.auto({
  loadHelpers: cb => moduleLoader.loadHelpers(CONFIG.ROOT, cb),
  loadLibraries: cb => moduleLoader.loadLibraries(CONFIG.ROOT, cb),
  loadControllers: cb => moduleLoader.loadController(CONFIG.ROOT, cb)
}, cb)
