import redis from 'redis'
import util from 'util'
let client = redis.createClient()
let hgetall = util.promisify(client.hgetall).bind(client)

client.on('connect', function () {
  console.log('connected to redis...')
})

export default class redisStore {
  constructor () {
    this.store = {}
  }

  set (hash, value) {
    if (typeof value === typeof {}) {
      for (let key in value) {
        let val = value[key]
        client.hset(hash, key, val, function (err) {
          if (err) console.log('My Errors:', err)
        })
      }
    }
  }

  async get (key) {
    let result
    try {
      result = await hgetall(key).then((data) => {
        if (data) {
          return data
        }
      })
    } catch (err) {
      console.log(err)
    }
    return result
  }

  async delete (key) {
    client.del(key, function (err, reply) {
      console.log('error:', err)
    })
  }
}
