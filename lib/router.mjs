export default class Router {
  constructor(path = '/') {
    this.routes = { GET: {}, POST: {} }
    this.path = path
    this.isRouter = true
  }

  get(path, fn) {
    this.routes.GET[path] = fn
  }

  post(path, fn) {
    this.routes.POST[path] = fn
  }

  getHandler(method, path) {
    const xPath = this.checkParams(method, path)
    return undefined != xPath
      ? this.routes[method][xPath]
      : this.routes[method][path]
  }

  checkParams(method, path) {
    let stockPath
    let reqPath = path.slice(1).split('/')
    return Object.keys(this.routes[method]).filter(part => {
      stockPath = part.slice(1).split('/')
      return reqPath[0] === stockPath[0] && reqPath.length === stockPath.length
        ? part
        : undefined
    })
  }
}
