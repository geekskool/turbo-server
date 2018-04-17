export default class MemoryStore {
  init(options) {
    this.store = {}
    this.expiryTime = options.expire
    return this
  }
  set(key, value) {
    this.store[key] = value

    setTimeout(() => {
      this.delete(key)
    }, this.expiryTime * 1000)
  }
  get(key) {
    return this.store[key]
  }
  delete(key) {
    delete this.store[key]
  }
}
