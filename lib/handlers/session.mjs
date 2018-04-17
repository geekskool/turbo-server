import uid from 'uid-safe'
import signature from 'cookie-signature'
import { DataBase, dbOptions } from './../../lib/stores/config'

let sessionStoreDB = new DataBase()
let sessionStore = sessionStoreDB.init(dbOptions)

class Session {
  async init(req, res) {
    let data
    const SECRET = 'session'
    if (req.cookies && req.cookies.sess_id) {
      const unsigned = signature.unsign(req.cookies.sess_id, SECRET)
      this.sess_id = unsigned
      data = sessionStore.get(unsigned)
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
    res.setCookie('sess_id', signature.sign(this.sess_id, SECRET), {
      maxAge: dbOptions.expire
    })
  }

  async set(key, value) {
    let data = sessionStore.get(this.sess_id)
    if (data instanceof Promise) {
      data = await data
    }
    if (!data) {
      data = { sess_id: this.sess_id }
    }
    data[key] = value
    await sessionStore.set(this.sess_id, data)
  }

  get(key) {
    let result = sessionStore.get(this.sess_id)
    return result
  }

  delete() {
    sessionStore.delete(this.sess_id)
  }
}

export default async function() {
  if (sessionStore instanceof Promise) {
    sessionStore = await sessionStore
  }
  this.session = new Session()
  await this.session.init(this, this.res)
  return null
}
