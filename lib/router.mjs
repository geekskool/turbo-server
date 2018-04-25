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
    return handler ? handler : this.findRouter(method, path, this.routers)
  }

  findRouter(method, path, routers, idx = 0) {
    // for (const router of this.routers) {
    //   if (path.startsWith(router.path)) {
    //     path = path.slice(router.path.length)
    //     const handler = router.routes[method]
    //     return path == '' ? handler['/'] : handler[path]
    //   }
    // }
    const splitPath = path.slice(1).split('/')
    if (!Array.isArray(routers)) routers = [routers]
    for (const router of routers) {
      if (path.startsWith(router.path)) {
        path = path.slice(router.path.length)
        const splitPath = path
          .slice(1)
          .split('/')
          .map(p => `/${p}`)
        if (router.routers[idx].path === splitPath.shift()) {
          path = path.slice(router.routers[idx].path.length)
          return this.findRouter(method, path, router.routers[idx], idx++)
        } else if (router.routes[method]) {
          const handler = router.routes[method]
          return path == '' ? handler['/'] : handler[path]
        }
      } else {
        const handler = router.routes[method]
        return path == '' ? handler['/'] : handler[path]
      }
    }
  }
}
