import querystring from 'querystring'

const parsers = {
  'application/json': req => {
    req.body = JSON.parse(req._body.toString())
  },
  'application/x-www-form-urlencoded': req => {
    req.body = querystring.parse(req._body.toString())
  }
}

export default function () {
  if (this.method === 'POST' && this._body) {
    const type = this.getHeader('Content-Type')
    const parser = parsers[type]
    if (parser) parser(this)
  }
  this.next()
}
