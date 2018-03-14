import turbo from 'turbo-http'
import cookie from 'cookie'

export default class Response extends turbo.Response {
  setCookie (name, value, opts) {
    this.setHeader('Set-Cookie', cookie.serialize(name, value, opts))
  }

  send (data) {
    if (typeof data === 'string' || Buffer.isBuffer(data)) {
      this.setHeader('Content-Length', data.length)
      this.write(data)
      return
    }
    if (typeof data === 'object') {
      let json = JSON.stringify(data)
      this.setHeader('Content-Type', 'application/json')
      this.setHeader('Content-Length', json.length)
      this.write(json)
    }
  }
}
