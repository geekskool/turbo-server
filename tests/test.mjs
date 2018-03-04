import childProcess from 'child_process'
import fetch from 'node-fetch'
import test from 'tape'

const spawn = childProcess.spawn
// Start the app
const env = Object.assign({}, process.env, {PORT: 5000})
const child = spawn('node', ['lib/server.js'], {env})

test('responds to requests', (t) => {
  t.plan(3)
  // Wait until the server is ready
  child.stdout.on('data', async _ => {
    let res, text, error
    try {
      res = await fetch('http://127.0.0.1:5000')
      text = await res.text()
      // stop the server
      child.kill()
    } catch (e) {
      error = e
    }
    t.false(error)
    t.equal(res.status, 200)
    t.equal(text, 'hello world')
  })
})
