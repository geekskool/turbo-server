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

## Static files
Statics files are served from `public` folder by default. Just create a `public` folder
in `my-app` and put your static files there.

## Handlers
All handlers are called with the Request object as `this`. Response object is
`this.res` in the handler. To call the next handler call `this.next()`.

## Router 
Router class whose constructor can be acccessed by `App.Router()` class provides routing functionalities.

To add specific function (`func`) to a route use `router.get(route, func)`(for GET requests) or `router.post(route, func)`(for POST requests) where `router` is an instance of `App.Router` route is the relative path.

After setting up the router add the `router` to the `app`(instance of `App`) by using `app.addRouter(router)` method.

## Redirect 
Redirects to a `url` can be sent to the client by using `redirect(url)` method of responce.

```
  this.res.redirect('http://www.example.com')
```
## Port
The server by default uses the port `5000` to host the apps, however you can change the `port` either by explicitly declaring it in the app (`app.listen(port)`),

Or by setting `PORT` up in your environment (execute `$ export PORT=port` in terminal before running the server)

Setting in your environment will take precedence over setting in the app.