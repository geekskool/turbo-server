import redis from 'redis'
import util from 'util'

export default class redisStore {
  constructor (options) {
    this.client = redis.createClient(options)
    this.hgetall = util.promisify(this.client.hgetall).bind(this.client)
    this.hmset = util.promisify(this.client.hmset).bind(this.client)
    this.del = util.promisify(this.client.del).bind(this.client)
    this.ttl = options.expire || 60 * 60 * 24 * 7 // default 1 week
    this.client.on('connect', function () {
      console.log('connected to redis...')
    })
    this.client.on('error', function (error) {
      console.error('Error: RedisStore reported an error: ' + error)
    })
  }

  set (hash, value) {
    this.hmset(hash, value)
    if (this.ttl) {
      let timeout = new Date().setSeconds(this.ttl)
      this.client.expireat(hash, parseInt(timeout / 1000))
    }
  }

  get (key) {
    let result = this.hgetall(key)
    return result
  }

  delete (key) {
    this.del(key)
  }
}
