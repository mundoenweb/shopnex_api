const connection = require("../db/connection")
const errorQuery = require("../handlersQuerys/errorQuery")
const queryByParamID = require("../handlersQuerys/queryByParamID")
const StructResponse = require("../models/response")

const login = (req, res) => {
  const user = req.body
  const sql = `INSERT INTO roles (name) VALUES ('${user.name}')`

  connection.query(sql, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const rolCreated = await queryByParamID(result.insertId, 'roles')
    const responseJson = new StructResponse({
      code: 201,
      message: 'rol creado con exito'
    }, {}, rolCreated)

    res.status(201).json(responseJson)
  })
}

module.exports = {
  login
}
