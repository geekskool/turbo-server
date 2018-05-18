import path from 'path'
import fs from 'fs'

const ROOT = process.cwd()
const configPath = path.join(ROOT, 'turbo-serv.json')

const configDefault = {
  static: {dir: 'public'},
  cors: {
    origin: ['http://localhost:5000'],
    methods: ['GET'],
    credentials: false,
    allowedHeaders: []
  }
}

let config
try {
  config = fs.readFileSync(configPath)
  config = JSON.parse(config)
} catch (e) {
  console.log('Parser Error in config file')
  config = configDefault
}

config.ROOT = ROOT

export default config
