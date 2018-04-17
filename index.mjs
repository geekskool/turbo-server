import App from './lib/server'

const app = new App()
const router = app.getRouter()
router.get('/user/123', function() {
  this.res.send('TEST TURBO SERVER')
})

app.listen(8080)
