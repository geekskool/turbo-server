import turbo from 'turbo-http'
import Request from './request'
import Response from './response'
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

class Server extends turbo.Server {
  _onhttpconnection (socket) {
    const req = new Request(this, socket)
    const res = new Response(this, socket, req)
    req.onhead = () => this.emit('request', req, res)
  }
}

export default class App {
  constructor () {
    this.server = new Server()
    this.server.on('request', function (req, res) {
      req.res = res
      req._next = rootHandler
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
