import path from 'path'

const DIRNAME = process.cwd()

export default async function () {
  if (this.method !== 'GET') return null
  this.url = this.url === '/' ? '' : this.url
  let filePath = path.join(DIRNAME, 'public', this.url)
  if (path.extname(filePath) === '') {
    filePath += '/index.html'
  }
  return this.res.sendFile(filePath)
}
