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
    this.routers = {}
    this.addRouter(new Router())
  }

  addRouter(router) {
    if (!this.routers[router.path]) {
      this.router = router
      this.routers[router.path] = router
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
    // this.addRouter(new Router(path))
    return this.routes
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

  static Routers() {
    return Router
  }
}
