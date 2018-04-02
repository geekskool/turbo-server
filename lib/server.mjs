import turbo from 'turbo-http'
import Request from './request'
import Response from './response'
import cookieParser from './cookie-parser'
import bodyParser from './body-parser'
import staticHandler from './static-handler'
import finalHandler from './final-handler'
import Router from './router'
import sessionHandler from './session'

const HANDLERS = [
  cookieParser,
  sessionHandler,
  bodyParser,
  staticHandler
]

export default class App {
  constructor () {
    this.server = turbo.createServer(function (req, res) {
      Object.assign(req, Request)
      Object.assign(res, Response)
      req.res = res
      req._handlers = HANDLERS
      res.req = req
    })
    this.addRouter(new Router())
  }

  addRouter (router) {
    if (!this.router) {
      this.router = router
      HANDLERS.push(function () {
        const handler = router.getHandler(this.method, this.url)
        if (handler) {
          return this.callHandlers(handler)
        }
        return null
      },
      finalHandler)
    }
  }

  getRouter () {
    return this.router
  }

  listen (port) {
    this.PORT = process.env.PORT || port || 5000
    this.server.listen(this.PORT)
    console.log('Server running on PORT ' + this.PORT)
  }

  close () {
    this.server.close(_ => {
      console.log('Shutting down App!')
      process.exit()
    })
  }

  static get Router () { return Router }
}
