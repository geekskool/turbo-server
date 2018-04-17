import path from 'path'
import fs from 'fs'

const ROOT = process.cwd()
const configPath = path.join(ROOT, 'turbo-serv.json')

let config = fs.readFileSync(configPath)
try {
  config = JSON.parse(config)
} catch (e) {
  console.log('Parser Error in config file')
  config = {}
}

config.ROOT = process.cwd()

export default config
