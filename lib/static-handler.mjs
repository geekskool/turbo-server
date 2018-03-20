import fs from 'fs'
import util from 'util'
import path from 'path'
import mime from 'mime/lite'
import os from 'os'

const readFile = util.promisify(fs.readFile)
const DIRNAME = process.cwd()
const platform = os.platform()
const pathSeprator = platform==='win32' ? '\\' : '/'

export default async function () {
  if (this.method !== 'GET') return this.next()
  let filePath = path.join(DIRNAME, 'public', this.url.replace('/', pathSeprator))
  if (filePath.endsWith(pathSeprator)) {
    filePath += 'index.html'
  }
  const type = mime.getType(filePath)
  if (type === null) return this.next()
  try {
    const content = await readFile(filePath)
    this.res.setHeader('Content-Type', type)
    this.res.send(content)
  } catch (e) {
    this.next()
  }
}
