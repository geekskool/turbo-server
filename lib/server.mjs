import turbo from 'turbo-http'

class App {
  constructor () {
    this.server = turbo.createServer(function (req, res) {
      res.setHeader('Content-Length', '11')
      res.write(Buffer.from('hello world'))
    })
  }
  listen (port) {
    this.server.listen(port)
    console.log('Server running on PORT' + port)
  }
  close () {
    this.server.close(_ => {
      console.log('Shutting down App!')
      process.exit()
    })
  }
}

export default new App()
