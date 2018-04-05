import redis from 'redis'
import util from 'util'
let client = redis.createClient()
let hgetall = util.promisify(client.hgetall).bind(client)
let hmset = util.promisify(client.hmset).bind(client)
let del = util.promisify(client.del).bind(client)

client.on('connect', function () {
  console.log('connected to redis...')
})

export default class redisStore {
  set (hash, value) {
    hmset(hash, value)
  }

  get (key) {
    let result
    result = hgetall(key)
    return result
  }

  async delete (key) {
    del(key)
  }
}
