import finalHandler from './final-handler'

export default {
  onend () {
    if (this._body) this._body = Buffer.concat(this._body)
    this.next()
  },

  ondata (buf, start, length) {
    if (!this._body) this._body = []
    this._body.push(Buffer.from(buf.slice(start, length + start)))
  },

  async next (args) {
    if (this._next.isRouter) {
      const handler = this._next.getHandler(this.method, this.url)
      if (handler) {
        handler.next = this._next.next
        this._next = handler
      } else {
        this._next = this._next.next
      }
    }
    let result = this._next(args)
    if (result instanceof Promise) {
      result = await result
    }
    this._next = this._next.next
    if (result !== undefined) {
      if (this._next) return this.next(result)
    }
  }
/*
  next () {
    this.__next = this._next
    let next = this._next.next
    if (next && next.isRouter) {
      next = next.getHandler(this.method, this.url)
    }
    next = next || finalHandler
    this._next = next
    this.__next()
  }
*/
}
