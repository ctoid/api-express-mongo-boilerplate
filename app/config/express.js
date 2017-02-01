/* global TrimBodyHelper */

'use strict'

const morgan = require('morgan')
const responseTime = require('response-time')()
const methodOverride = require('method-override')()
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')()
const expressValidator = require('express-validator')
const nocache = require('nocache')
const nosniff = require('dont-sniff-mimetype')
const xssFilter = require('x-xss-protection')
const CORS = require('cors')
const uuidV1 = require('uuid/v1')

const corsOption = {
  origin: CONFIG.BASE_WEB_HOST,
  optionsSuccessStatus: 200
}

const errorResults = {}
const steed = require('steed')

const parallelMiddleware = middlewares => (req, res, next) => steed.each(middlewares, (mw, cb) => mw(req, res, cb), next)

module.exports = (app) => {
  app.use(CORS(corsOption))

  if (env === 'development') {
    app.use(morgan('dev'))
    app.use(responseTime)
    app.use(errorHandler)
  }

  app.disable('x-powered-by')
  app.enable('trust proxy')
  app.disable('etag')

  app.use(parallelMiddleware([
    methodOverride,
    bodyParser.json({ limit: '10mb' }),
    bodyParser.urlencoded({ extended: true, limit: '10mb' }),
    expressValidator(),
    nosniff(),
    nocache(),
    xssFilter()
  ]))

  app.use((req, res, next) => {
    if (req.body) {
      TrimBodyHelper(req.body)
    }
    return next()
  })

  app.use(require('serve-favicon')(CONFIG.ROOT + '/public/favicon.png'))

  /** ROUTES Apps */
  require(CONFIG.ROOT + '/app/routes')(app)

  // assume "not found" in the error msgs
  // is a 404. this is somewhat silly, but
  // valid, you can do whatever you like, set
  // properties, use instanceof etc.
  app.use((err, req, res, next) => {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }
    errorResults.message = err.stack
    errorResults.status = 500
    errorResults.id = uuidV1()

    return res.status(500).json(errorResults)
  })

  // assume 404 since no middleware responded
  app.use((req, res, next) => {
    errorResults.id = uuidV1()
    errorResults.message = 'Sorry, that page does not exist'
    errorResults.code = 34 // Corresponds with an HTTP 404 - the specified resource was not found.
    return res.status(404).json(errorResults)
  })
}
