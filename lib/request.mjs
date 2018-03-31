
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
    let result = this._next(args)
    if (result instanceof Promise) {
      try {
        result = await result
      } catch (e) {
        return
      }
    }
    this._next = this._next.next
    if (result !== undefined) {
      if (this._next) return this.next(result)
    }
  }
}
