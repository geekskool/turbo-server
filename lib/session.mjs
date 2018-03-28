import uid from 'uid-safe'
import MemoryStore from './memory-store'

let sesssionStore = new MemoryStore()

class Session {
  constructor (data) {
    if (!data) {
      data = {id: uid.sync(64)}
      sesssionStore.set(data.id, data)
    }
    this.sess_id = data.id
    this.data = data
  }

  set (key, value) {
    this.data[key] = value
    sesssionStore.set(key, value)
  }

  get (key) {
    console.log('get')
    console.log(this.data.id)
    // return this.data[key] //wrong
    return this.data.id // correct
    // why not from sesssionStore...?
  }

  delete () {
    sesssionStore.delete(this.sess_id)
  }
}

export default function () {
  if (this.cookies && this.cookies.sess_id) {
    this.session = new Session(sesssionStore.store[this.cookies.sess_id])
  } else {
    this.session = new Session()
  }
  console.log(sesssionStore)
  this.res.setCookie('sess_id', this.session.sess_id, {
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  this.next()
}
