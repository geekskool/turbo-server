const turbo = require('turbo-http')
const http = require('http')
const util = require('util')
const get = util.promisify(http.get)

const REQUESTS = 64

const server = turbo.createServer(function (req, res) {
  const data = Buffer.from('abcdef'.repeat(1000))
  res.setHeader('Content-Length', data.length)
//  res.setHeader('Connection', 'keep-alive')
  res.end(data, (err) => {
    if (err != null) {
      console.warn('Server Error:', err)
    }
  })
})

const agent = new http.Agent({ keepAlive: true, maxSockets: 2 })

const opts = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  agent: agent
}

const fireRequests = async () => {
  const promises = []
  for (let i = 0; i < REQUESTS; ++i) {
    promises.push(new Promise((resolve, reject) => {
      const req = http.get(opts, (res) => {
        let acc = ''
        console.log(res.headers)
        res.on('data', data => acc += data.toString())
        res.on('end', _ => undefined)
        res.resume()
        resolve()
      })
      req.on('error', reject)
    }))
  }
  try {
    await Promise.all(promises)
    agent.destroy()
    console.log('done')
  } catch (err) {
    console.warn(`Client Error:`, err)
  } finally {
    server.close()
  }
}

server.listen(8080, fireRequests)
