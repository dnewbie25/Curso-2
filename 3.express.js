const express = require('express')
const ditto = require('./ditto.json')

const app = express()
app.disable('x-powered-by')

// el middleware se ejecuta entre la peticion y la respuesta

app.use((req, res, next) => {
  console.log('mi primer middleware')
  // en el middleware se puede
  // trackear database
  // check for cookies
})

const PORT = process.env.PORT ?? 3000

app.get('/pokemon/ditto', (req, res) => {
  res.status(200).json(JSON.stringify(ditto))
})

app.post('/pokemon', (req, res) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    res.status(201).json(JSON.stringify(data))
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log('http://localhost:3000')
})
