const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')
console.log(process.argv)

const desiredPort = process.env.PORT ?? 1234

const processReques = (req, res) => {
  console.log('request received, ', req.url)
  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain; chatset=utf-8')
    res.end('Hola, bienvenido a la homepage')
  } else if (req.url === '/image.png') {
    fs.readFile('./image.png', (err, file) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal server error')
      } else {
        res.setHeader('Content-type', 'image/png')
        res.end(file)
      }
    })
  } else if (req.url === '/contact') {
    res.statusCode = 200
    res.setHeader('Content-type', 'text/plain; chatset=utf-8')
    res.end('contacto!!')
  } else {
    res.statusCode = 404
    res.end('No encontrada')
  }
}

const server = http.createServer(processReques)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})
