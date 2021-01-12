const express = require('express')
const getSecrets = require('./secrets')
const mongoConn = require("./dbConnection")
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, async () => {
  const mongoSecrets = await getSecrets()
  const  mongoConn = await dbConnect(mongoSecrets)
  //... use the mongo connection
  console.log(`Example app listening at http://localhost:${port}`)
})

