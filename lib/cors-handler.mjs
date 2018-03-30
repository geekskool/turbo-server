let option = {origin: 'http://localhost:5000',
  methods: ['GET']}

let allowedOrigins = option.origin || '*'
let allowedMethods = option.methods || ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE']
let headers = {}

function originMatch (origin) {
  if (allowedOrigins === '*') {
    return true
  } else if (typeof allowedOrigins === 'string' && allowedOrigins === origin) {
    return true
  } else if (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
    return true
  }
}

function methodMatch (method) {
  if (allowedMethods.includes(method)) {
    return true
  }
}

function configureOrigin (origin) {
  if (allowedOrigins === '*') {
    headers['Access-Control-Allow-Origin'] = '*'
  } else if (typeof allowedOrigins === 'string' && allowedOrigins === origin) {
    headers['Access-Control-Allow-Origin'] = origin
  } else if (Array.isArray(allowedOrigins) && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }
}

function configureMethod (method) {
  headers['Access-Control-Allow-Methods'] = allowedMethods.join(',')
}

function isAllowed (origin, method) {
  return methodMatch(method) && originMatch(origin)
}

export default function () {
  //console.log(this)
  let origin = this.getHeader('origin')
  let method = this.method
  let accessControlRequestMethod = this.getHeader('Access-Control-Request-Method')
  if (!origin) {
    this.next()
    return 0
  }

  // preflight
  if (method === 'OPTIONS' && accessControlRequestMethod) {
    if (!methodMatch(method)) {
      this.next()
      return 0
    }
    configureMethod(method)
    Object.entries(headers)
      .map(header => this.res.setHeader(header[0], header[1]))
  }

  if (isAllowed(origin, method)) {
    configureMethod(method)
    configureOrigin(origin)
    Object.entries(headers)
      .map(header => this.res.setHeader(header[0], header[1]))
    this.next()
  } else {
    this.res.end()
  }
}
