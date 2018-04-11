import uid from 'uid-safe'
import signature from 'cookie-signature'
import MemoryStore from '../stores/memory'

const sessionStore = new MemoryStore()

class Session {
  constructor (req, res) {
    let data
    const SECRET = 'session'
    if (req.cookies && req.cookies.sess_id) {
      const unsigned = signature.unsign(req.cookies.sess_id, SECRET)
      data = sessionStore.get(unsigned)
    }
    if (!data) {
      data = { id: uid.sync(64) }
      sessionStore.set(data.id, data)
    }
    this.sess_id = data.id
    this.data = data
    res.setCookie('sess_id', signature.sign(this.sess_id, SECRET), {
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }

  set (key, value) {
    let data = sessionStore.get(this.sess_id)
    data[key] = value
    sessionStore.set(this.sess_id, data)
  }

  get (key) {
    return sessionStore.get(this.sess_id)[key]
  }

  delete () {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  this.session = new Session(this, this.res)
  return null
}
