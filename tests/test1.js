const turbo = require('turbo-http')
const http = require('http')

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
    promises.push(new Promise((resolve, reject) => {
      const req = http.get({ hostname: 'localhost', port: 8080, path: '/' }, (res) => {
        res.resume()
        resolve()
      })
      req.on('error', reject)
    }))
  }
  try {
    await Promise.all(promises)
  } catch (err) {
    console.warn(`Client Error:`, err)
  } finally {
    server.close()
  }
}

server.listen(8080, fireRequests)
