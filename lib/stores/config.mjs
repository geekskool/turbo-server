import MemoryStore from './memory'
import RedisStore from './redis'
import MongoStore from './mongo'

// Available storage types: In-Memory, Redis, Mongo

let dbConfig = {
  memory: {
    host: '',
    port: 0,
    // expire: 60 * 60 * 24 * 7, // 1 week
    expire: 3,
    database: MemoryStore
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    expire: 120, // 2 min
    database: RedisStore
  },
  mongo: {
    host: '127.0.0.1',
    port: 27017,

    expire: 120,
    database: MongoStore
  }
}

// Set prefered DB by setting dbConfig['mongo' | 'redis' | memory]
const DataBase = dbConfig['memory'].database
const dbOptions = dbConfig['memory']

export { DataBase, dbOptions }
