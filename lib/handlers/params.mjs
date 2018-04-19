export default function() {
  let reqPath = this.url.slice(1).split('/')
  this.param = isFinite(reqPath[1]) ? Number(reqPath[1]) : reqPath[1]
  this.url = `/${reqPath[0]}`
  return null
}

// const checkParams = (method, path) => {
//   const params = {}
//   let matchedRoute
//   let stockPath
//   let reqPath = path.slice(1).split('/')
//   // get all route names from defined routes
//   Object.keys(this.routes[method]).filter(part => {
//     stockPath = part.slice(1).split('/')
//     const condition =
//       reqPath[0] === stockPath[0] && reqPath.length === stockPath.length
//     if (condition) {
//       for (let i = 1; i < stockPath.length; i++) {
//         if (stockPath[i].startsWith(':')) {
//           params[stockPath[i].slice(1)] = reqPath[i]
//         }
//       }
//       matchedRoute = part
//     }
//   })
//   return [matchedRoute, params]
// }
