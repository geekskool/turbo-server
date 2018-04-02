import uid from 'uid-safe'

const sessions = {}

class Session {
  constructor(req, res) {
    let data
    if (req.cookies && req.cookies.sess_id) {
      data = sessionStore.store[req.cookies.sess_id]
    }
    if (!data) {
      data = { id: uid.sync(64) }
      sessionStore.set(data.id, data)
    }
    this.sess_id = data.id
    this.data = data
    res.setCookie('sess_id', this.sess_id, {
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }

  set(key, value) {
    let data = sessionStore.get(this.sess_id)
    data[key] = value
    sessionStore.set(this.sess_id, data)
  }

  get(key) {
    return sessionStore.get(this.sess_id).key
  }

  delete() {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  this.session = new Session(this, this.res)
  console.log(sessionStore)
  this.next()
}
