import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.get('/new', function () {
  console.log('app', this)
  this.session.ole = 'yola'
  this.res.send(this.session)
})

router.get('/check', function () {
  this.res.send(this.session.ole)
})

router.get('/delete', function () {
  delete this.session.ole
  this.res.send('')
})

app.addRouter(router)

app.listen()
