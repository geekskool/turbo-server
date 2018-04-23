import fetch from 'node-fetch'
import test from 'tape'
import App from '../lib/server'
import FormData from 'form-data'
import signature from 'cookie-signature'
// Start App Server
const app = new App()
// const router = app.getRouter()

const settingsRouter = new (App.Routers())('/settings')

// router.post('/', function() {
//   this.res.send(this.body)
// })
settingsRouter.get('/create', function() {
  this.res.send('settings/create route')
})

// router.get('/session', function() {
//   this.res.send({ sess_id: this.session.sess_id })
// })

// router.get('/redirect', function() {
//   this.res.redirect('/wonderland')
// })

// router.post('/urlencoded', function() {
//   this.res.send(this.body)
// })

// router.post('/multipartform', function() {
//   this.res.send(this.body)
// })

// router.get('/download', function() {
//   const file = './public/index.html'
//   const filename = 'app.html'
//   this.res.download(file, filename)
// })

// router.get('/user', function() {
//   this.res.send({ user: `Hi User!. Your id is ${this.param}` })
// })

// router.get('/user/edit', function() {
//   this.res.send({ user: `Your id is ${this.param}. This is an edit route.` })
// })

// router.get('/user/delete', function() {
//   this.res.send({
//     user: `Your id is ${this.param}. Delete user logic goes here.`
//   })
// })

app.listen() // process.env.PORT || 5000

// test('responds to requests', async t => {
//   t.plan(33)
//   let res, data, cookie, error

//   try {
//     res = await fetch('http://127.0.0.1:5000/aa')
//     data = await res.text()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 404)
//   t.equal(data, 'Not Found')

//   // Test GET '/'. Should return index.html in public folder

//   try {
//     res = await fetch('http://127.0.0.1:5000')
//     data = await res.text()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.equal(data, '<h1>hello world</h1>\n')

//   // Test POST '/' with {hello: 'world'}

//   try {
//     res = await fetch('http://127.0.0.1:5000', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ hello: 'world' })
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, { hello: 'world' })

//   // Test Session

//   try {
//     res = await fetch('http://127.0.0.1:5000/session')
//     data = await res.json()
//     cookie = res.headers.get('set-cookie')
//     const [name, value] = cookie.split(';')[0].split('=')
//     const val = signature.unsign(decodeURIComponent(value), 'session')
//     cookie = { [name]: val }
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, cookie)

//   // Test res.redirect

//   try {
//     res = await fetch('http://127.0.0.1:5000/redirect', {
//       redirect: 'manual',
//       follow: 0
//     })
//     data = res.headers.get('Location')
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 302)
//   t.equal(data, 'http://127.0.0.1:5000/wonderland')

//   // Test urlencoded

//   try {
//     res = await fetch('http://127.0.0.1:5000/urlencoded', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: 'input1=hello&input2=world&input3=are+you%3F'
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, { input1: 'hello', input2: 'world', input3: 'are you?' })

//   // Test multipart form-data

//   try {
//     let form = new FormData()
//     form.append('input1', 'hello')
//     form.append('input2', 'world')
//     form.append('input3', 'are you?')
//     res = await fetch('http://127.0.0.1:5000/multipartform', {
//       method: 'POST',
//       body: form
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data.fields, {
//     input1: 'hello',
//     input2: 'world',
//     input3: 'are you?'
//   })

//   // Test res.download

//   try {
//     res = await fetch('http://127.0.0.1:5000/download')
//     data = res.headers.get('Content-Disposition')
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.equal(data, 'attachment;filename="app.html"')

//   // Test user with param

//   try {
//     res = await fetch('http://127.0.0.1:5000/user/507f160ea', {
//       method: 'GET'
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, { user: 'Hi User!. Your id is 507f160ea' })

//   // Test user with param and edit route.

//   try {
//     res = await fetch('http://127.0.0.1:5000/user/507f160ea/edit', {
//       method: 'GET'
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, { user: 'Your id is 507f160ea. This is an edit route.' })

//   // Test user with param and delete route.

//   try {
//     res = await fetch('http://127.0.0.1:5000/user/507f160ea/delete', {
//       method: 'GET'
//     })
//     data = await res.json()
//   } catch (e) {
//     error = e
//   }
//   t.false(error)
//   t.equal(res.status, 200)
//   t.deepEqual(data, {
//     user: 'Your id is 507f160ea. Delete user logic goes here.'
//   })
//   // Shutdown App Server
//   app.close()
// })
