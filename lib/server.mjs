import turbo from 'turbo-http'
import staticHandler from './static-handler'

const rootHandler = staticHandler

const addHandler = (parent, handler) => {
  if (parent.next) {
    addHandler(parent.next, handler)
  } else {
    parent.next = handler
  }
}

const next = function () {
  if (this._next) {
    this.__next = this._next
    if (this.__next.next) {
      this._next = this.__next.next
    }
    this.__next()
  }
}

const finalHandler = function () {
  this.res.statusCode = 404
  this.res.setHeader('Content-Length', 9)
  this.res.write(Buffer.from('Not Found'))
}

addHandler(rootHandler, finalHandler)

export default class App {
  constructor () {
    this.server = turbo.createServer(function (req, res) {
      req.res = res
      req._next = rootHandler
      req.next = next
      req.next()
    })
  }
  listen (port) {
    this.server.listen(process.env.PORT || port || 5000)
    console.log('Server running on PORT' + port)
  }
  close () {
    this.server.close(_ => {
      console.log('Shutting down App!')
      process.exit()
    })
  }
}
