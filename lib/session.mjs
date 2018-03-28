import uid from 'uid-safe'
import MemoryStore from './memory-store'

const sessions = {}
let store

class Session {
  constructor (data) {
    if (!data) {
      data = {id: uid.sync(64)}
      sessions[data.id] = data
    }
    this.sess_id = data.id
    this.data = data
  }

  set (key, value) {
    this.data[key] = value
    sessions[this.sess_id][key] = value
    console.log('in set of session')
    console.log(this.store)
    this.store.set(key,value)
  }

  get (key) {
    return this.data[key]
  }

  delete () {
    delete sessions[this.sess_id]
  }
}

export default function () {
  console.log('store')
  if(!store){
    store = MemoryStore()
    console.log(store)
  }
  if (this.cookies && this.cookies.sess_id) {
    console.log('this.cookies')
    console.log(this.cookies)
    this.session = new Session(sessions[this.cookies.sess_id])
  } else {
    this.session = new Session()
  }
  this.res.setCookie('sess_id', this.session.sess_id, {
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  this.next()
}
