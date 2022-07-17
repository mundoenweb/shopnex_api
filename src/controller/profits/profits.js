const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const queryByParam = require('../../handlersQuerys/queryByParam')
const StructResponse = require('../../models/response')

const getProfits = (req, res) => {
  const sql = 'SELECT * FROM profits'

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const banks = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(banks)
  })
}
const getProfitById = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const sql = 'SELECT * FROM profits WHERE id=?'

  connection.query(sql, id, (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const banks = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(banks)
  })
}
const postCreateProfits = (req, res) => {
  return new Promise((resolve, reject) => {
    const id = req.userID
    const table = 'profits'

    const sql = `INSERT INTO ${table} SET users_id = ${id}`

    connection.query(sql, async (err, result) => {
      if (err) resolve(err)
      const profit = await queryByParamID(result.insertId, table)
      return resolve(profit)
    })
  })
}
const putProfits = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const userID = req.userID
    const mount = req.mount
    const mount_referred = req.mount_referred
    const table = 'profits'

    const profitCurrent = await queryByParamID(userID, table, 'users_id')
    let profitUpdate = {
      mount: profitCurrent[0].mount,
      mount_referred: profitCurrent[0].mount_referred,
      mount_total: profitCurrent[0].mount_total
    }

    if (mount || mount == 0) {
      profitUpdate.mount += mount
      profitUpdate.mount_total += mount
    } else if (mount_referred || mount_referred == 0) {
      profitUpdate.mount_referred += mount_referred
      profitUpdate.mount_total += mount_referred
    }

    const sql = `UPDATE ${table} SET ?, 
    updated_at = DEFAULT WHERE users_id = ${userID}`

    connection.query(sql, profitUpdate, async (err, result) => {
      if (err) {
        resolve(err)
      }
      const profit = await queryByParamID(userID, table, 'users_id')
      resolve(profit)
    })
  })
}

const putProfitsWithDrawOrBuy = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const userID = req.userID
    const mount = req.mount
    const table = 'profits'

    const profitCurrent = await queryByParamID(userID, table, 'users_id')

    const mount_total = profitCurrent[0].mount_total += mount

    const sql = `UPDATE ${table} SET mount_total = ${mount_total},
    updated_at = DEFAULT WHERE users_id = ${userID}`

    connection.query(sql, async (err, result) => {
      if (err) {
        resolve(err)
      }
      const profit = await queryByParamID(userID, table, 'users_id')
      resolve(profit)
    })
  })
}

const putProfitsRefered = (referedBy, mount) => {
  return new Promise(async (resolve, _) => {
    const amountCommissionByRefered = 0.5
    const commissionRefered = mount * amountCommissionByRefered
    const table = 'profits'

    const referredByUser = await queryByParam(referedBy, 'users', 'code_referred_by')
    const profitsUsersReferred = await queryByParam(referredByUser[0].id, table, 'users_id')
    

    let profitUpdate = {
      mount_referred: profitsUsersReferred[0].mount_referred += commissionRefered,
      mount_total: profitsUsersReferred[0].mount_total += commissionRefered,
    }

    const sql = `UPDATE ${table} SET ?, 
    updated_at = DEFAULT WHERE users_id = ${referredByUser[0].id}`

    connection.query(sql, profitUpdate, async (err, result) => {
      if (err) {
        resolve(err)
      }
      const data = await queryByParam(referredByUser[0].id, table, 'users_id')
      resolve(data)
    })
  })
}

module.exports = {
  getProfits,
  getProfitById,
  postCreateProfits,
  putProfits,
  putProfitsWithDrawOrBuy,
  putProfitsRefered
}
