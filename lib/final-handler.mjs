
export default function () {
  this.res.statusCode = 404
  const content = 'Not Found'
  this.res.setHeader('Content-Length', content.length)
  this.res.write(content)
}
