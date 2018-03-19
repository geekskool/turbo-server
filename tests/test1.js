const turbo = require('turbo-http')
const fetch = require('node-fetch')

const REQUESTS = 64

const server = turbo.createServer(function (req, res) {
  const data = Buffer.from('abcdef'.repeat(1000))
  res.setHeader('Content-Length', data.length)
  res.end(data, (err) => {
    if (err != null) {
      console.warn('Server Error:', err)
    }
  })
})

const fireRequests = async () => {
  const promises = []
  for (let i = 0; i < REQUESTS; ++i) {
    promises.push(fetch('http://127.0.0.1:5000'))
  }
  try {
    await Promise.all(promises)
    console.log('done')
  } catch (err) {
    console.warn(`Client Error:`, err)
  } finally {
    server.close()
  }
}

server.listen(8080, fireRequests)
