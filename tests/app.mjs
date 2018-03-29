import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.get('/page', function () {
  this.res.send(String(this.session.get('visited')))
  this.session.set('visited', (this.session.get('visited') || 0) + 1)
  console.log(this)
})

app.addRouter(router)

app.listen() // process.env.PORT || 5000
