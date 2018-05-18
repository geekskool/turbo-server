import path from 'path'
import config from '../config'

export default async function () {
  if (this.method !== 'GET') return null
  let url = this.url
  url = url === '/' ? '' : url
  let filePath = path.join(config.ROOT, config.static.dir, url)
  if (path.extname(filePath) === '') {
    filePath += '/index.html'
  }
  return this.res.sendFile(filePath)
}
