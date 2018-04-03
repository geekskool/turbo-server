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
    console.log('setting: ', hash, value)
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
    console.log('getting ', key)
    let result
    try {
      result = await hgetall(key)
      console.log('resu:' + result[key])
    } catch (err) {
      console.log(`promisify error:`)
      console.log(err)
    }
    // result.then((data)=>console.log(data))
    return result
  }

  delete (key) {

  }
}
