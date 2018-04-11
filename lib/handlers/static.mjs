import path from 'path'

const DIRNAME = process.cwd()

export default async function () {
  if (this.method !== 'GET') return null
  let url = this.url
  url = url === '/' ? '' : url
  let filePath = path.join(DIRNAME, 'public', url)
  if (path.extname(filePath) === '') {
    filePath += '/index.html'
  }
  return this.res.sendFile(filePath)
}
