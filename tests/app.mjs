import App from '../lib/server'

const app = new App()
const router = new App.Router('/')

router.get('/', function () {
    this.res.redirect('http://www.example.com')
})

app.addRouter(router)
app.listen() // process.env.PORT || 5000