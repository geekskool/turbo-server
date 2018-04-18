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
    let stockPath
    let reqPath = path.split('/').filter(i => i.length > 1)
    const xPath = Object.keys(this.routes[method]).filter(p => {
      stockPath = p.split('/').filter(i => i.length > 1)
      if (reqPath[0] === stockPath[0] && reqPath.length === stockPath.length) {
        return p
      }
    })
    return undefined != xPath
      ? this.routes[method][xPath]
      : this.routes[method][path]
  }
}
