import MemoryStore from './memory'
import RedisStore from './redis'
import MongoStore from './mongo'

import config from './../config'

// Available storage types: In-Memory, Redis, Mongo

let storeConfig = {
  memory: MemoryStore,
  redis: RedisStore,
  mongo: MongoStore
}
// Set prefered DB by setting dbConfig['mongo' | 'redis' | memory]

const DataBase = storeConfig[config.session.store]
const dbOptions = config.session.options

export { DataBase, dbOptions }
