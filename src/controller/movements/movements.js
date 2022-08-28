const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')
const { putProfitsWithDrawOrBuy, putProfits, putProfitsRefered } = require('../profits/profits')
const { usersSubscriptions, usersUpdateQtyTask } = require('../users/users')

const createMovementWithdraw = async (req, res) => {
  const data = req.body
  const mount = -data.mount
  const users_id = data.users_id
  const table = 'movements'
  const time = new Date()
  const code = `${users_id}-${time.getTime()}`

  const profit = await queryByParamID(users_id, 'profits', 'users_id')
  const profitMount = profit[0].mount

  if (data.mount > profitMount) {
    let msg = 'no puede retirar mas diner del disponible'
    errorQuery(res, 400, null, msg)
    return
  }

  const movement = {
    code,
    users_id,
    mount,
    type_transactions_id: 2,
    status: 'pendiente'
  }

  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, movement, async (err, result) => {
    if(err) {
      errorQuery(res, 500, err)
    }

    req.userID = users_id
    req.mount = mount
    const profit = await putProfitsWithDrawOrBuy(req, res)
    const movement = await queryByParamID(result.insertId, table)


    const response = new StructResponse({
      code: 200,
      message: "retiro en proceso"
    }, {}, [{
      movement: movement[0],
      profit
    }])
    res.status(200).json(response)
  })
  
}
const createMovementBuy = async (req, res) => {
  const data = req.body
  const mount = data.mount
  const users_id = data.users_id
  const table = 'movements'
  const time = new Date()
  const code = `${users_id}-${time.getTime()}`

  const movement = {
    code,
    users_id,
    mount,
    type_transactions_id: 1,
    subscriptions_id: data.subscriptions_id,
    status: data.status,
    order_gateway: data.order_gateway,
    reference_pay: data.reference_pay
  }

  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, movement, async (err, result) => {
    if(err) {
      errorQuery(res, 500, err)
    }

    await usersSubscriptions(users_id, data.subscriptions_id)

    req.userID = users_id
    req.mount = mount
    const profit = await putProfitsWithDrawOrBuy(req, res)
    const movement = await queryByParamID(result.insertId, table)


    const response = new StructResponse({
      code: 200,
      message: "deposito en proceso"
    }, {}, [{
      movement: movement[0],
      profit
    }])

    res.status(200).json(response)
  })
  
}
const createMovementTask = async (req, res) => {
  const data = req.body
  const commission_task = data.commission_task
  const users_id = data.users_id
  const referedBy = data.referedBy
  const table = 'movements'
  const time = new Date()
  const code = `${users_id}-${time.getTime()}`

  const movement = {
    code,
    users_id,
    mount: data.mount,
    commission_task,
    type_transactions_id: 3,
    tasks_id: data.tasks_id,
  }

  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, movement, async (err, result) => {
    if(err) {
      errorQuery(res, 500, err)
    }

    req.userID = users_id
    req.mount = commission_task
    const movement = await queryByParamID(result.insertId, table)
    if (referedBy) {
      await putProfitsRefered(referedBy, commission_task)
    }
    await usersUpdateQtyTask(req, res)
    const profit = await putProfits(req, res)


    const response = new StructResponse({
      code: 200,
      message: "deposito en proceso"
    }, {}, [{
      movement: movement[0],
      profit
    }])

    res.status(200).json(response)
  })
}
const getMovementsAll = (_, res) => {
  const table = 'movements'
  const sql = `SELECT * FROM ${table} ORDER BY created_at DESC`
  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }

    const users = new StructResponse({
      code: 200,
      message: 'consulta exitosa'
    }, {}, result)

    res.status(200).json(users)
  })
}
const getMovementsTaks = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'movements'

  const sql = `SELECT 
  ${table}.id, users.name, tasks.name AS task
  FROM ${table} INNER JOIN users
  ON ${table}.users_id = users.id
  INNER JOIN tasks
  ON ${table}.tasks_id = tasks.id
  WHERE type_transactions_id = 3
  ORDER BY ${table}.created_at DESC`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const users = new StructResponse({
      code: 200,
      message: 'consulta exitosaaaa'
    }, {}, result)

    res.status(200).json(users)
  })
}
const getMovementsById = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'movements'

  const sql = `SELECT 
  ${table}.id, tasks.name AS taskName, commission_task, ${table}.created_at AS date,
  users.name AS nameUser
  FROM ${table} INNER JOIN users
  ON ${table}.users_id = users.id
  INNER JOIN tasks
  ON ${table}.tasks_id = tasks.id
  WHERE ${table}.id = ${id}
  ORDER BY ${table}.created_at DESC`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const users = new StructResponse({
      code: 200,
      message: 'consulta exitosa'
    }, {}, result)

    res.status(200).json(users)
  })
}
const getMovementsByIdUser = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'movements'
  const sql = `SELECT * FROM ${table} WHERE users_id = ${id} ORDER BY created_at DESC`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const users = new StructResponse({
      code: 200,
      message: 'consulta exitosa'
    }, {}, result)

    res.status(200).json(users)
  })
}

const getMovementsByTaskByIdUser = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'movements'
  const sql = `SELECT
  ${table}.id, name, commission_task
  FROM ${table} INNER JOIN tasks
  ON ${table}.tasks_id = tasks.id
  WHERE users_id = ${id}
  AND type_transactions_id = 3
  ORDER BY ${table}.created_at DESC`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const users = new StructResponse({
      code: 200,
      message: 'consulta exitosa'
    }, {}, result)

    res.status(200).json(users)
  })
}



module.exports = {
  createMovementWithdraw,
  createMovementBuy,
  createMovementTask,
  getMovementsAll,
  getMovementsTaks,
  getMovementsById,
  getMovementsByIdUser,
  getMovementsByTaskByIdUser
}
