const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const rolesGet = (req, res) => {
  const sql = 'SELECT * FROM roles'
  connection.query(sql, (err, reults) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: 'consulta exitosa',
    }, {}, reults)

    res.status(200).json(responseJson)
  })
  
}
const rolesCreate = (req, res) => {
  const name = req.body.name
  const table = 'roles'
  const sql = `INSERT INTO ${table} (name) VALUES ('${name}')`
  
  if (!name || !isNaN(name)) {
    errorQuery(res, 400, null, 'el campo name esta indefinido o no es un string')
    return 
  }
  console.log(name)

  connection.query(sql, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const rolCreated = await queryByParamID(result.insertId, table)
    const responseJson = new StructResponse({
      code: 201,
      message: 'rol creado con exito'
    }, {}, rolCreated)

    res.status(201).json(responseJson)
  })
}
const rolesUpdate = (req, res) => {
  const name = req.body.name
  const id = parseInt(req.params.id, 10)
  const table = 'roles'

  const sql = `UPDATE ${table} SET name = '${name}' WHERE id = ${id};`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return 
  }
  if (!name || !isNaN(name)) {
    errorQuery(res, 400, null, 'el campo name esta indefinido o no es un string')
    return 
  }

  connection.query(sql, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const rolCreated = await queryByParamID(id, table)
    const responseJson = new StructResponse({
      code: 201,
      message: 'rol actualizado con exito'
    }, {}, rolCreated)

    res.status(201).json(responseJson)
  })
}

const rolesDelete = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'roles'

  const sql = `DELETE FROM ${table} WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return 
  }

  connection.query(sql, async (err, _) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const responseJson = new StructResponse({
      code: 201,
      message: 'rol eliminado con exito'
    })

    res.status(201).json(responseJson)
  })
}

module.exports = {
  rolesGet,
  rolesCreate,
  rolesUpdate,
  rolesDelete
}
