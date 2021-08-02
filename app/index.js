const express = require('express')
const app = express()
const mysql = require('mysql')

const PORT = 3000
const HOST = "0.0.0.0"
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)

//Cria a tabela
const create_table_query = 'CREATE TABLE people(name VARCHAR(255)'
connection.query(create_table_query)

const insert_name_query = `INSERT INTO people(name) VALUES('Luiz Fernando')`
connection.query(insert_name_query)

app.get('/', (req, res) => {

  const sql = 'SELECT * FROM people'

  connection.query(sql, (error, results, fields) => {
    if(error)
      res.json(error)
    else {

      let namesString = ''

      results.forEach(each => {
        namesString = namesString + `<li>${each.name}</li>`
      })
      
      const result = `
      <h1>Full Cycle Rocks!</h1>
      <ul>
        ${namesString}
      </ul>
      `
      res.send(result)

    }
  })
})

app.listen(PORT, HOST)
console.log(`Listening on host ${HOST}, port ${PORT}`)
