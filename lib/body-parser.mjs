import querystring from 'querystring'
import incomingForm from 'formidable/lib/incoming_form'

const parsers = {
  'application/json': (req, cb) => {
    req.body = JSON.parse(req._body.toString())
    cb()
  },
  'application/x-www-form-urlencoded': (req, cb) => {
    req.body = querystring.parse(req._body.toString())
    cb()
  },
  'multipart/form-data': (req, cb) => {
    let IncomingForm = new incomingForm.IncomingForm()
    let fields = {}
    let headers = {}
    IncomingForm.on('field', (name, value) => {
      fields[name] = value
    }).on('end', () => {
      console.log(fields)
      req.body = fields
      cb()
    })
    req.getAllHeaders().forEach((v, k) => {
      headers[k] = v
    })
    IncomingForm.writeHeaders(headers)
    console.log(req._body.toString())
    IncomingForm.write(req._body)
    IncomingForm._parser.end()
  }
}

export default function () {
  if (this.method === 'POST' && this._body) {
    const type = this.getHeader('Content-Type').split(';')[0]
    const parser = parsers[type]
    if (parser) {
      parser(this, () =>
        this.next()
      )
    } else {
      this.next()
    }
  } else {
    this.next()
  }
}
