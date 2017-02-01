/* global */

'use strict'

const fs = require('fs')
const path = require('path')

const apiVersion = '/v1/'

module.exports = app => {
  fs.readdirSync(CONFIG.ROOT + '/app/routes').forEach(file => {
    const extname = path.extname(file)
    const basename = path.basename(file, extname)

    if (~file.indexOf('.js') && basename !== 'index') {
      app.use(apiVersion + basename, require(CONFIG.ROOT + '/app/routes/' + file))
    }
  })
}
