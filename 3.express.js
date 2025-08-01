const express = require('express')
const ditto = require('./ditto.json')

const app = express()
app.disable('x-powered-by')

// el middleware se ejecuta entre la peticion y la respuesta

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    // mutar la request y meter la informacion en el req.body
    req.body = data
    next()
  })
})

const PORT = process.env.PORT ?? 3000

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(JSON.stringify(ditto))
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log('http://localhost:3000')
})
