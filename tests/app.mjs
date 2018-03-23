import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.get('/new', function () {
  console.log('app', this)
  this.session.set('yo', 'lo')
  this.res.send('set')
})

router.get('/check', function () {
  console.log('app', this)
  this.session.get('yo')
  this.res.send(this.session.get('yo'))
})

router.get('/delete', function () {
  console.log('app', this)
  this.session.delete('yo')
  this.res.send(this.session.get('yo'))
})

app.addRouter(router)

app.listen()
