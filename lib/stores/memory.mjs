export default class MemoryStore {
  init () {
    this.store = {}
    return this
  }
  set (key, value) {
    this.store[key] = value
  }
  get (key) {
    return this.store[key]
  }
  delete (key) {
    delete this.store[key]
  }
}
