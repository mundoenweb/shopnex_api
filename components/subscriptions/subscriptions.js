const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const subscriptionsGet = (req, res) => {
  const sql = 'SELECT * FROM subscriptions'
  connection.query(sql, (err, result) => {

    if (err) {
      errorQuery(res, 500)
      return
    }
    console.log(res)
    const responseJson = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(responseJson)
  })
}
const getSubscriptionById = (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM subscriptions WHERE id = ${id}`
  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 500)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(responseJson)
  })
}

const subscriptionsCreate = (req, res) => {
  const data = req.body
  const table = 'subscriptions'
  const sql = `INSERT INTO ${table}
  VALUES(DEFAULT, '${data.name}', '${data.cost}',
  '${data.commission}','${data.description}', DEFAULT, NULL)`

  if (!data.name || !data.cost || !data.commission || !data.description) {
    errorQuery(res, 400, null, "uno o mas campos estan indefinidos")
    return
  }

  if (!isNaN(data.name) || !isNaN(data.description)) {
    errorQuery(res, 400, null, "el nombre o descripcion no puede ser un numero")
    return
  }

  if (isNaN(data.cost) || isNaN(data.commission)) {
    errorQuery(res, 400, null, "el costo o comision no puede ser un texto")
    return
  }

  connection.query(sql, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }

    const subscriptionsCreated = await queryByParamID(result.insertId, table)

    const responseJson = new StructResponse({
      code: 201,
      message: `Suscripción ${data.name} creado exitosamente`
    }, {}, subscriptionsCreated)

    res.status(201).json(responseJson)

  })
}

const subscriptionsUpdate = (req, res) => {
  const data = req.body
  const id = parseInt(req.params.id, 10)
  const table = 'subscriptions'

  const sql = `UPDATE ${table} SET ? WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  } else if (!data.name || !data.cost || !data.commission || !data.description) {
    errorQuery(res, 400, null, "uno o mas campos estan indefinidos")
    return
  } else if (!isNaN(data.name) || !isNaN(data.description)) {
    errorQuery(res, 400, null, "el nombre o descripcion no puede ser un numero")
    return
  } else if (isNaN(data.cost) || isNaN(data.commission)) {
    errorQuery(res, 400, null, "el costo o comision no puede ser un texto")
    return
  }

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }

    const subscriptionsCreated = await queryByParamID(id, table)

    const responseJson = new StructResponse({
      code: 201,
      message: `Suscripción ${data.name} actualizado exitosamente`
    }, {}, subscriptionsCreated)

    res.status(201).json(responseJson)

  })
}

const subscriptionsDelete = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'subscriptions'

  const sql = `DELETE FROM ${table} WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  }

  connection.query(sql, async (err) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: `Suscripción eliminada exitosamente`
    })

    res.status(201).json(responseJson)

  })
}
module.exports = {
  subscriptionsGet,
  getSubscriptionById,
  subscriptionsCreate,
  subscriptionsUpdate,
  subscriptionsDelete
}
