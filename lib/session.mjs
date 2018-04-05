import uid from 'uid-safe'
import MemoryStore from './memory-store'
import RedisStore from './redis-store'

let options = {
  database: RedisStore
}

let sessionStore = new options.database()

class Session {
  async init (req, res) {
    let data
    if (req.cookies && req.cookies.sess_id) {
      this.sess_id = req.cookies.sess_id
      data = await this.get()
      console.log(data)
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

  async set (key, value) {
    let data = await sessionStore.get(this.sess_id)
    if (!data) {
      data = {}
    }
    data[key] = value
    sessionStore.set(this.sess_id, data)
  }

  get (key) {
    let result = sessionStore.get(this.sess_id)
    console.log('get session')
    console.log(result)
    return result
  }

  delete () {
    sessionStore.delete(this.sess_id)
  }
}

export default function () {
  console.log('=====================================================================')
  this.session = new Session()
  this.session.init(this, this.res)
  console.log(sessionStore)
  return null
}
