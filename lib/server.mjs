import turbo from 'turbo-http'
import Request from './request'
import Response from './response'
import cookieParser from './handlers/cookie'
import bodyParser from './handlers/body'
import staticHandler from './handlers/static'
import finalHandler from './handlers/final'
import Router from './router'
import sessionHandler from './handlers/session'

const HANDLERS = [staticHandler, cookieParser, sessionHandler, bodyParser]

export default class App {
  constructor() {
    this.server = turbo.createServer(function(req, res) {
      Object.assign(req, Request)
      Object.assign(res, Response)
      req.res = res
      req._handlers = HANDLERS
      res.req = req
    })
    this.addRoute(new Router())
  }
  addRoute(router) {
    if (!this.router) {
      this.router = router
      HANDLERS.push(function() {
        const handler = router.getHandler(this.method, this.url)
        if (handler) {
          return this.callHandlers(handler)
        }
        return null
      }, finalHandler)
    }
  }

  getRouter() {
    return this.router
  }

  listen(port) {
    this.PORT = process.env.PORT || port || 5000
    this.server.listen(this.PORT)
    console.log('Server running on PORT ' + this.PORT)
  }

  close() {
    this.server.close(_ => {
      console.log('Shutting down App!')
      process.exit()
    })
  }

  static get Router() {
    return Router
  }
}
