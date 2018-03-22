import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.get('/new', function () {
  this.res.send(this.session.ole)
})

router.get('/check', function () {
  console.log('app', this)
  this.session.ole = 'yola'
  this.res.send(this.session)
})

router.get('/delete', function () {
  this.res.send('')
})

app.addRouter(router)

app.listen()
