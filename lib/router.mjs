export default class Router {
  constructor(path = '/') {
    this.routes = { GET: {}, POST: {} }
    this.path = path
    this.isRouter = true
    this.routers = []
  }

  get(path, fn) {
    this.routes.GET[path] = fn
  }

  post(path, fn) {
    this.routes.POST[path] = fn
  }

  addRouter(router) {
    this.routers.push(router)
  }

  getHandler(method, path) {
    const handler = this.routes[method][path]
    return handler ? handler : this.findRouter(method, path)
  }

  findRouter(method, path) {
    for (const router of this.routers) {
      if (path.startsWith(router.path)) {
        path = path.slice(router.path.length)
        const handler = router.routes[method]
        return path == '' ? handler['/'] : handler[path]
      }
    }
  }
}
