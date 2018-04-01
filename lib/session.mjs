import uid from 'uid-safe'

const sessions = {}

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
  }

  get (key) {
    return this.data[key]
  }

  delete () {
    delete sessions[this.sess_id]
  }
}

export default function () {
  if (this.cookies && this.cookies.sess_id) {
    this.session = new Session(sessions[this.cookies.sess_id])
  } else {
    this.session = new Session()
  }
  this.res.setCookie('sess_id', this.session.sess_id, {
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  return null
}
