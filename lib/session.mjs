import uid from 'uid-safe'
// import MemoryStore from './memory-store'
import RedisStore from './redis-store'

let sessionStore = new RedisStore()

class Session {
  constructor (req, res) {
    console.log('cookie')
    console.log(req.cookies)
    let data
    if (req.cookies && req.cookies.sess_id) {
      this.sess_id = req.cookies.sess_id
      // console.log('identity ' + req.cookies.sess_id)
      this.get('id', req.cookies.sess_id).then(function (d) {
        data = d
        if (!data) {
          data = { id: uid.sync(64) }
          this.sess_id = data.id
          this.data = data
          sessionStore.set(data.id, data)
        } else {
          this.sess_id = data.id
          this.data = data
        }
        console.log('sess_id: ' + this.sess_id)
        res.setCookie('sess_id', this.sess_id, {
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }.bind(this))
    } else {
      if (!data) {
        data = { id: uid.sync(64) }
        this.sess_id = data.id
        this.data = data
        sessionStore.set(data.id, data)
        res.setCookie('sess_id', this.sess_id, {
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }
    }
  }

  async set (key, value) {
    // console.log('set:', key, value)
    // console.log('for:', this.sess_id)
    let data = await sessionStore.get(this.sess_id)
    // console.log('data:' + data)
    if (!data) {
      data = {}
    }
    data[key] = value
    sessionStore.set(this.sess_id, data)
  }

  async get (key, sess) {
    // console.log('get:', key, ' from: ', sess)
    let result
    if (!sess) {
      sess = this.sess_id
    }
    result = await sessionStore.get(sess)
    // console.log('result')
    // console.log(result)
    return result
  }

  async delete () {
    await sessionStore.delete(this.sess_id)
  }
}

export default function () {
  console.log('=====================================================================')
  this.session = new Session(this, this.res)
  // console.log(sessionStore.store)
  return null
}
