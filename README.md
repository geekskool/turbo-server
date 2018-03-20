# Turbo Server
A Web Server based on [turbo HTTP](https://www.npmjs.com/package/turbo-http)

## Installation

```
$ npm install turbo-serv --save
```

## Create an app

```
$ mkdir my-app && cd my-App
$ npm init
```

Edit `start` in your `package.json`
```
{
  "name": "my-app",
  "scripts": {
    "start": "node --experimental-modules index.mjs"
  },
}
```

Create `index.mjs` in `my-app` folder
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

run
```
$ npm start
```

## Static files
Statics files are served from `public` folder by default. Just create a `public` folder
in `my-app` and put your static files there.

## Handlers
All handlers are called with the Request object as `this`. Response object is
`this.res` in the handler. To call the next handler call `this.next()`.
