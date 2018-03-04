const { spawn } = require('child_process')
// const request = require('request')
const fetch = require('node-fetch')
const test = require('tape')

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000})
const child = spawn('node', ['lib/server.js'], {env})

test('responds to requests', (t) => {
  t.plan(3)

  // Wait until the server is ready
  child.stdout.on('data', async _ => {
    let error
    try {
      const res = await fetch('http://127.0.0.1:5000')
      const text = await res.text()
      // stop the server
      child.kill()
      t.equal(res.status, 200)
      t.equal(text, 'hello world')
    } catch (e) {
      error = e
    }
    t.false(error)
  })
})
