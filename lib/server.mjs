import turbo from 'turbo-http'
import requestPatches from './request-patches'
import responsePatches from './response-patches'
import bodyParser from './body-parser'
import staticHandler from './static-handler'

const addHandler = (handler, parent = rootHandler) => {
  if (parent.next) {
    addHandler(handler, parent.next)
  } else {
    parent.next = handler
  }
}

const rootHandler = bodyParser
addHandler(staticHandler)

export default class App {
  constructor () {
    this.server = turbo.createServer(function (req, res) {
      req.res = res
      req._next = rootHandler
      Object.assign(req, requestPatches)
      Object.assign(res, responsePatches)
    })
    this.router = false
  }

  addRouter (router) {
    if (!this.router) {
      this.router = true
      addHandler(router)
    }
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
}
