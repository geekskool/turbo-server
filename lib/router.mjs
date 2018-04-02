
export default class Router {
  constructor (path = '/') {
    this.routes = {GET: {}, POST: {}}
    this.path = path
    this.isRouter = true
  }

  get (path, fn) {
    this.routes.GET[path] = fn
  }

  post (path, fn) {
    this.routes.POST[path] = fn
  }

  getHandler (method, path) {
    return this.routes[method][path]
  }
}
