import path from 'path'

const DIRNAME = process.cwd()

export default async function () {
  if (this.method !== 'GET') return this.next()
  this.url = this.url === '/' ? '' : this.url
  let filePath = path.join(DIRNAME, 'public', this.url)
  if (path.extname(filePath) === '') {
    filePath += '/index.html'
  }
  this.res.sendFile(filePath)
}
