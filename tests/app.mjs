import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.get('/cors', function () {
  this.res.send('cors')
})

app.addRouter(router)

app.listen() // process.env.PORT || 5000
