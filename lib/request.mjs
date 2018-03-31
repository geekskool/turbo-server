
export default {
  onend () {
    if (this._body) this._body = Buffer.concat(this._body)
    this.callHandlers(this._handlers)
  },

  ondata (buf, start, length) {
    if (!this._body) this._body = []
    this._body.push(Buffer.from(buf.slice(start, length + start)))
  },

  async callHandlers (handlers, arg) {
    if (!Array.isArray(handlers)) handlers = [handlers]
    let result = arg
    for (const handler of handlers) {
      result = handler.bind(this)(result)
      if (result instanceof Promise) {
        try {
          result = await result
        } catch (e) {
          break
        }
      }
      if (result === undefined) {
        break
      }
    }
    return result
  }
}
