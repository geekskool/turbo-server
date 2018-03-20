# turbo-server
A Web Server based on [turbo HTTP](https://www.npmjs.com/package/turbo-http)

index.mjs
```
import App from 'turbo-serv'

const app = new App()
const router = new App.Router('/')

router.get('/', function () {
  this.res.send('Hello World')
})

app.addRouter(router)
app.listen(8080)
```
`node --experimental-modules index.mjs`

Installation
--
turbo-serv is available in [npm registry](https://www.npmjs.com/package/turbo-serv) as a [Node.js](https://nodejs.org) module.

To install run

`npm init`

`npm install turbo-serv --save`

Import turbo-serv in project
--

Add this line at the top of your file

`import App from 'turbo-serv'`

Initiating server
---
`const app = new App()` // Initiate App instance

`const router = new App.Router('/')` // Initiate Router 

Add functions to routes
--

Add functions for spesific route by using `router.get(path, callback)` or `router.post(path, callback)` for get and post requests respectively.

```
router.get('/my', myFunc) //myFunc will run when route <domain>/my is accessed.
```

