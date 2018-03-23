import uid from 'uid-safe'

const sessions = {}

class Session {
  constructor (data) {
    this.sess_id = uid.sync(64)
    if (data !== null && typeof data === 'object') {
      Object.assign(this, data)
    }
  }

  set (key, value) {
    this[key] = value
  }

  get (key) {
    return this[key]
  }

  delete (key, value) {
    delete this[key]
  }
}

export default function (data) {
  console.log('sessions', this, sessions)
  let sessionUid
  if (this.cookies && sessions.hasOwnProperty(this.cookies.sess_id)) {
    sessionUid = this.cookies.sess_id
    this.session = sessions[sessionUid]
  } else {
    this.session = new Session(data)
    sessionUid = this.session.sess_id
    sessions[sessionUid] = this.session

    this.res.setCookie('sess_id', sessionUid, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }

  this.next()
}
