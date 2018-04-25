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
    return typeof handler == 'function'
      ? handler
      : this.findRouter(method, path, this.routers)
  }

  findRouter(method, path, routers) {
    if (!Array.isArray(routers)) routers = [routers]
    for (const router of routers) {
      if (path.startsWith(router.path)) {
        path = path.slice(router.path.length)
        const deepRouter = this.hasDeepRouter(
          router,
          path
            .slice(1)
            .split('/')
            .map(token => `/${token}`)
            .shift()
        )
        return deepRouter
          ? this.findRouter(method, path, deepRouter)
          : router.routes[method][path]
      }
    }
  }

  hasDeepRouter(router, pathToken) {
    const route = router.routers.filter(route => route.path === pathToken)
    return route ? route[0] : null
  }
}
