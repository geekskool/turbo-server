class Cors {
  constructor (option) {
    if (option) {
      this.allowedOrigins = option
    } else {
      this.allowedOrigins = '*'
    }
  }

  isAllowed (url) {
    if (this.allowedOrigins === '*') {
      return true
    }
    return this.allowedOrigins.includes(url)
  }
}
export default function () {
  console.log(this)
  let cors = new Cors(['http://localhost:5000'])
  let origin = this.getHeader('origin')
  if (!origin) {
    this.next()
    return 0
  }
  if (cors.isAllowed(origin)) {
    this.res.setHeader('Access-Control-Allow-Origin', origin)
    this.next()
  } else {
    this.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
    this.res.end()
  }
}
