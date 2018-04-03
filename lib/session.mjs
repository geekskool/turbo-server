import uid from 'uid-safe'
// import MemoryStore from './memory-store'
import RedisStore from './redis-store'

let sessionStore = new RedisStore()

class Session {
  constructor (req, res) {
    console.log('new session')
    console.log(req.cookies)
    let data
    if (req.cookies && req.cookies.sess_id) {
      this.sess_id = req.cookies.sess_id
      console.log('identity ' + req.cookies.sess_id)
      this.get('id', req.cookies.sess_id).then(function (d) {
        data = d
        console.log('find session in db:', d)
        if (!data) {
          data = { id: uid.sync(64) }
          this.sess_id = data.id
          this.data = data
          console.log('sess data:', data)
          sessionStore.set(data.id, data)
        }
        this.sess_id = data.id
        this.data = data
        res.setCookie('sess_id', this.sess_id, {
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      })
      // data.then((d)=> {
      //   data=d
      //   console.log('find session in db:', d)
      // })
    } else {
      if (!data) {
        data = { id: uid.sync(64) }
        this.sess_id = data.id
        this.data = data
        console.log('sess data:', data)
        sessionStore.set(data.id, data)
        this.sess_id = data.id
        this.data = data
        res.setCookie('sess_id', this.sess_id, {
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }
    }
  }

  set (key, value) {
    console.log('set:', key, value)
    console.log('for:', this.sess_id)
    let data = sessionStore.store[this.sess_id]
    console.log('data:' + data)
    if (!data) {
      data = {}
      data[key] = value
    }
    sessionStore.set(this.sess_id, data)
  }

  async get (key, sess) {
    let result
    if (!sess) {
      sess = this.sess_id
    }
    await sessionStore.get(sess).then((data) => {
      console.log('in promise resolve')
      result = data[key]
      console.log('key', key)
      console.log(result)
    }
    )
    console.log('result')
    console.log(result)
    return result
  }

  delete () {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  console.log('=====================================================================')
  this.session = new Session(this, this.res)
  // console.log(sessionStore.store)
  console.log('RESPONSE')
  console.log(this.res.cookies)
  this.next()
}
