import turbo from 'turbo-http'
import Request from './request'
import Response from './response'
import cookieParser from './cookie-parser'
import bodyParser from './body-parser'
import staticHandler from './static-handler'
import finalHandler from './final-handler'
import Router from './router'
import Session from './session'

const addHandler = (handler, parent = rootHandler) => {
  if (parent.next) {
    addHandler(handler, parent.next)
  } else {
    parent.next = handler
  }
}

const rootHandler = cookieParser
addHandler(Session)
addHandler(bodyParser)
addHandler(staticHandler)

export default class App {
  constructor () {
    this.server = turbo.createServer(function (req, res) {
      Object.assign(req, Request)
      Object.assign(res, Response)
      req.res = res
      res.req = req
      req._next = rootHandler
    })
    this.addRouter(new Router())
  }

  addRouter (router) {
    if (!this.router) {
      this.router = router
      addHandler(function () {
        const handler = router.getHandler(this.method, this.url)
        if (handler) {
          return handler.bind(this)()
        }
        return null
      })
    }
  }

  getRouter () {
    return this.router
  }

  listen (port) {
    addHandler(finalHandler)
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
