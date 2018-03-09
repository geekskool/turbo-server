import finalHandler from './final-handler'

export default {
  onend: function () {
    this._body = this._body ? Buffer.concat(this._body) : undefined
    this.next()
  },
  ondata: function (buf, start, length) {
    if (!this._body) {
      this._body = []
    }
    this._body.push(buf.slice(start, length + start))
  },
  next: function () {
    if (this._next) {
      this.__next = this._next
      if (this._next.next) {
        this._next = this._next.next
      } else {
        this._next = finalHandler
      }
      this.__next()
    }
  }
}
