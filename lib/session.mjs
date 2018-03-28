import uid from 'uid-safe'
import MemoryStore from './memory-store'

let sessionStore = new MemoryStore()

class Session {
  constructor (data) {
    if (!data) {
      data = {id: uid.sync(64)}
      sessionStore.set(data.id, data)
    }
    this.sess_id = data.id
    this.data = data
  }

  set (key, value) {
    this.data[key] = value
    sessionStore.set(key, value)
  }

  get (key){
    return this.data.id
  }

  delete () {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  if (this.cookies && this.cookies.sess_id) {
    this.session = new Session(sessionStore.store[this.cookies.sess_id])
  } else {
    this.session = new Session()
  }
  this.res.setCookie('sess_id', this.session.sess_id, {
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  this.next()
}
