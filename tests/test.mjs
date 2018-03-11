import fetch from 'node-fetch'
import test from 'tape'
import App from '../lib/server'
import Router from '../lib/router'

// Start App Server
const app = new App()
const router = new Router('/')
router.post('/', function () {
  this.res.send(this.body)
})
app.addRouter(router)
app.listen() // process.env.PORT || 5000

test('responds to requests', async (t) => {
  t.plan(9)
  let res, data, error
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
  // Shutdown App Server
  app.close()
})
