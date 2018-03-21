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

Edit `start` in your `package.json`. Turbo server uses mjs modules. So works on
the latest nodejs with experimental modules set.

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

## App

`new App()` creates a new app.
`app.listen(port)`. If `process.env.PORT` is set, that is taken as PORT. If not
the `port` given to `app.listen` is taken. If both are not given 5000 is taken as PORT.

## Static files

Statics files are served from `public` folder by default. Just create a `public` folder
in `my-app` and put your static files there.

## Router

Create a new router with `new App.Router()`.

Set your routes with `router.get` and `router.post`

Add router to App instance. `app.addRouter(router)`.

## Handlers

All handlers are called with the Request object as `this`. Response object is
`this.res` in the handler. To call the next handler call `this.next()`.

## Response Object
Following methods are added to the Response Object.

send(data) - If data is string or Buffer type, data is sent as Buffer. If type is Object
data is sent as 'application/json'.

redirect(url) - Sends a 302 statusCode and redirects to given url

## Todo

1. Sessions
2. Url encoded form data
3. Multi Part form data
4. Nested Routers
5. File downloads
