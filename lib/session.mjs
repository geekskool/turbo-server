import uid from 'uid-safe'

const sessions = {}

export default function () {
  console.log('sessions', this, sessions)
  let sessionUid
  if (sessions.hasOwnProperty(this.cookies.sess_id)) {
    sessionUid = this.cookies.sess_id
  } else {
    sessionUid = uid.sync(64)
    sessions[sessionUid] = {
      sess_id: sessionUid
    }

    this.res.setCookie('sess_id', sessionUid, {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
  }
  Object.assign(this, {session: sessions[sessionUid]})

  this.next()
}
