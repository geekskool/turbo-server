import fetch from 'node-fetch'
import test from 'tape'
import App from '../lib/server'

// Start App Server
const app = new App()
const router = new App.Router('/')

router.post('/', function () {
  this.res.send(this.body)
})

router.get('/new', function () {
  this.session.set('key', 'value')
  this.res.send('set')
})

router.get('/check', function () {
  this.session.get('key')
  this.res.send(this.session.get('key'))
})

router.get('/delete', function () {
  this.session.delete('key')
  this.res.send('delete')
})

app.addRouter(router)

app.listen() // process.env.PORT || 5000

test('responds to requests', async (t) => {
  t.plan(19)
  let res, data, cookie, error
  try {
    res = await fetch('http://127.0.0.1:5000/aa')
    data = await res.text()
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 404)
  t.equal(data, 'Not Found')
  try {
    res = await fetch('http://127.0.0.1:5000')
    data = await res.text()
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  t.equal(data, '<h1>hello world</h1>\n')
  try {
    res = await fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({hello: 'world'})
    })
    data = await res.json()
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  t.deepEqual(data, {hello: 'world'})
  try {
    res = await fetch('http://127.0.0.1:5000/new', {
      method: 'GET'
    })
    cookie = res.headers.get('set-cookie')
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  try {
    res = await fetch('http://127.0.0.1:5000/check', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Cookie: cookie}
    })
    data = await res.text()
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  t.equal(data, 'value')
  try {
    res = await fetch('http://127.0.0.1:5000/delete', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Cookie: cookie}
    })
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  try {
    res = await fetch('http://127.0.0.1:5000/check', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', Cookie: cookie}
    })
    data = await res.text()
  } catch (e) {
    error = e
  }
  t.false(error)
  t.equal(res.status, 200)
  t.notEqual(data, 'value')

  // Shutdown App Server
  app.close()
})
