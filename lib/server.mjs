import turbo from 'turbo-http'

const rootHandler = function () {
  this.res.setHeader('Content-Length', '11')
  this.res.write(Buffer.from('hello world'))
}

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
    if (this._next.next) {
      this._next = this._next.next
    }
    this.__next()
  }
}

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
