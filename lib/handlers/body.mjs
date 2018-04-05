import querystring from 'querystring'
import incomingForm from 'formidable/lib/incoming_form'

const parsers = {
  'application/json': function () {
    this.body = JSON.parse(this._body.toString())
    return null
  },

  'application/x-www-form-urlencoded': function () {
    this.body = querystring.parse(this._body.toString())
    return null
  },

  'multipart/form-data': function () {
    const req = this
    return new Promise((resolve, reject) => {
      let IncomingForm = new incomingForm.IncomingForm()
      let fields = {}
      let files = {}
      let headers = {}
      IncomingForm.on('field', (name, value) => {
        fields[name] = value
      }).on('file', function (name, file) {
        if (req.multiples) {
          if (files[name]) {
            if (!Array.isArray(files[name])) {
              files[name] = [files[name]]
            }
            files[name].push(file)
            return
          }
        }
        files[name] = file
      }).on('end', () => {
        req.body = {'fields': fields, 'files': files}
        resolve(null)
      })
      req.getAllHeaders().forEach((v, k) => {
        headers[k] = v
      })
      IncomingForm.writeHeaders(headers)
      IncomingForm.write(req._body)
      IncomingForm._parser.end()
    })
  }
}

export default function () {
  if (this.method === 'POST' && this._body) {
    let type = this.getHeader('Content-Type')
    type = type ? type.split(';')[0] : ''
    const parser = parsers[type]
    if (parser) {
      return parser.bind(this)()
    }
  }
  return null
}
