import cookie from 'cookie'

export default {
  setCookie (name, value, opts) {
    this.setHeader('Set-Cookie', cookie.serialize(name, value, opts))
  },

  send (data) {
    if (typeof data === 'string' || Buffer.isBuffer(data)) {
      this.setHeader('Content-Length', data.length)
      this.write(data, (err, data) => {
        if (err) console.log(err)
      })
    }
    if (typeof data === 'object') {
      let json = JSON.stringify(data)
      this.setHeader('Content-Type', 'application/json')
      this.setHeader('Content-Length', json.length)
      this.write(json)
    }
    this.end()
  },

  redirect (url) {
    this.statusCode = 302
    this.setHeader('Location', url)
    this.end()
  }
}
