import fs from 'fs'
import util from 'util'
import path from 'path'

const readFile = util.promisify(fs.readFile)
const DIRNAME = process.cwd()

export default async function () {
  let filePath = path.join(DIRNAME, 'public', this.url)
  if (filePath.endsWith('/')) {
    filePath += 'index.html'
  }
  try {
    let content = await readFile(filePath)
    this.res.setHeader('Content-Length', content.toString().length)
    this.res.write(content)
  } catch (e) {
    this.next()
  }
}
