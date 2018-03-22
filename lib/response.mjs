import cookie from 'cookie'
import fs from 'fs'
import util from 'util'
import mime from 'mime/lite'

const readFile = util.promisify(fs.readFile)

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
  },

  async sendFile (filePath) {
    const type = mime.getType(filePath)
    if (type === null) return this.req.next()
    try {
      const content = await readFile(filePath)
      this.setHeader('Content-Type', type)
      this.send(content)
    } catch (e) {
      this.req.next()
    }
  },

  redirect (url) {
    this.statusCode = 302
    this.setHeader('Location', url)
    this.end()
  }
}
