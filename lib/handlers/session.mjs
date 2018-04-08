import uid from 'uid-safe'
import MemoryStore from '../stores/memory'
import RedisStore from '../stores/redis'

let options = {
  // host: '127.0.0.2',
  // port: 5432,
  // expire: 120, // 2 min
  database: RedisStore
}
let DB = options.database || MemoryStore
let sessionStore = new DB(options)

class Session {
  async init (req, res) {
    let data
    if (req.cookies && req.cookies.sess_id) {
      this.sess_id = req.cookies.sess_id
      data = this.get()
      if (data instanceof Promise) {
        data = await data
      }
    }
    if (!data) {
      data = { id: uid.sync(64) }
      sessionStore.set(data.id, data)
    }
    this.sess_id = data.id
    this.data = data
    res.setCookie('sess_id', this.sess_id, {
      maxAge: options.expire || 60 * 60 * 24 * 7
    })
  }

  async set (key, value) {
    let data = sessionStore.get(this.sess_id)
    if (data instanceof Promise) {
      data = await data
    }
    if (!data) {
      data = {}
    }
    data[key] = value
    sessionStore.set(this.sess_id, data)
  }

  get (key) {
    let result = sessionStore.get(this.sess_id)
    return result
  }

  delete () {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  this.session = new Session()
  this.session.init(this, this.res)
  return null
}
