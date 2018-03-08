const parsers = {
  'application/json': req => {
    req.body = JSON.parse(req._body.toString())
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
