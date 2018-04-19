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

  getHandler(method, path, context) {
    const extractedParams = this.checkParams(method, path)
    let xPath = extractedParams[0]
    context.params = extractedParams[1]
    return undefined != xPath
      ? this.routes[method][xPath].bind(context)
      : this.routes[method][path]
  }

  checkParams(method, path) {
    const params = {}
    let matchedRoute
    let stockPath
    let reqPath = path.slice(1).split('/')
    // get all route names from defined routes
    Object.keys(this.routes[method]).filter(part => {
      stockPath = part.slice(1).split('/')
      const condition =
        reqPath[0] === stockPath[0] && reqPath.length === stockPath.length
      if (condition) {
        for (let i = 1; i < stockPath.length; i++) {
          if (stockPath[i].startsWith(':')) {
            params[stockPath[i].slice(1)] = reqPath[i]
          }
        }
        matchedRoute = part
      }
    })
    return [matchedRoute, params]
  }
}
