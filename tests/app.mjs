import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

const html = '<a href="/new">new</a><br><a href="/check">check</a><br><a href="/delete">delete</a>'

router.get('/new', function () {
  console.log('app', this)
  this.session.set('yo', 'lo')
  this.res.send(html)
})

router.get('/check', function () {
  console.log('app', this)
  this.session.get('yo')
  this.res.send(html)
})

router.get('/delete', function () {
  console.log('app', this)
  this.session.set('yo')
  this.res.send(html)
})

app.addRouter(router)

app.listen()
