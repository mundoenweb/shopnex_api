const mysql = require('mysql')
const { mysqlDB } = require("./config")

const connection = mysql.createConnection(mysqlDB)

connection.connect((err, conn) =>{
  if (err) {
    console.log("ocurrio un error al conectarse con mysql")
    return
  }
  console.log("conexion exitosa a mysql")
  return conn
})

module.exports = connection
