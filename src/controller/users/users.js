const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')
const { postCreateProfits } = require('../profits/profits')
const expMail = /\w+@\w+\.+[a-z]/
const secretPassword = "Adoracionviva.3467"


const usersGet = (req, res) => {
  const sql = 'SELECT * FROM users'
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
const usersGetForApproval = (req, res) => {
  const sql = `SELECT * FROM users 
  WHERE photo_perfil <> '' 
  AND photo_credential_front <> ''
  AND photo_credential_revers <> ''
  AND name <> ''
  AND certificate = 0`

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
const userGET = async (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'users'

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  }
  const user = await queryByParamID(id, table)

  const responseJson = new StructResponse({
    code: 200,
    message: `consulta exitosa`
  }, {}, user)
  res.status(200).json(responseJson)
}

const usersCreate = (req, res) => {
  const data = req.body
  const table = 'users'
  const sql = `INSERT INTO ${table}
  (roles_id, subscriptions_id, email, password, code_referred_by)
  VALUES(1,1, '${data.email}', '${bcrypt.hashSync(data.password, 10)}', '${data.code_referred_by}')`

  if (!data.email || !data.password) {
    errorQuery(res, 400, null, "uno o mas campos estan indefinidos")
    return
  } else if (!expMail.test(data.email)) {
    errorQuery(res, 400, null, "favor ingrese un email valido")
    return
  }

  connection.query(sql, async (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }

    const dataUser = await queryByParamID(result.insertId, table)
    delete dataUser[0].password

    req.userID = dataUser[0].id
    const profits = await postCreateProfits(req, res)

    // 84600 segundos es igual a 1 dia
    jwt.sign({ user: dataUser[0] }, secretPassword, { expiresIn: 84600 }, (_, token) => {

      const responseJson = new StructResponse({
        code: 201,
        message: `Usuario registrado con exito`
      }, {}, [{ token, user: dataUser[0], profits }])

      res.status(201).json(responseJson)
    })
  })
}

const usersUpdate = (req, res) => {
  const data = req.body
  const id = parseInt(req.params.id, 10)
  const table = 'users'

  if (!data.name || !data.number_credential || !data.phone) {
    errorQuery(res, 400, null, "uno o mas campos estan indefinidos")
    return
  }

  data.code_referred_by = btoa(data.number_credential);
  const sql = `UPDATE ${table} SET ? WHERE id = ${id}`

  connection.query(sql, data, async (err, _) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const user = await queryByParamID(id, table)
    delete user[0].password

    jwt.sign({ user: user[0] }, secretPassword, { expiresIn: 84600 }, (_, token) => {
      const responseJson = new StructResponse({
        code: 200,
        message: `Usuario actualizado con exito`
      }, {}, [{ token, user: user[0] }])

      res.status(200).json(responseJson)
    })
  })
}

const usersUpdateCredentials = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'users'

  if (!req.files.photo_perfil || !req.files.photo_credential_front
    || !req.files.photo_credential_revers) {
    errorQuery(res, 400)
    return
  }

  let photo_perfil = req.files.photo_perfil
  let photo_credential_front = req.files.photo_credential_front
  let photo_credential_revers = req.files.photo_credential_revers

  const images = [
    photo_perfil,
    photo_credential_front,
    photo_credential_revers
  ]

  for (let image of images) {
    if (!image) continue

    const extension = image.name.split('.')[1]
    image.name = `${image.md5}.${extension}`

    image.mv(`./files/${image.name}`, (err) => {
      if (!err) {
        image.pathCurrent = `/files/${image.name}`
      }
    })
  }

  setTimeout(() => {

    const sql = `UPDATE ${table} SET 
    photo_perfil = '${photo_perfil.pathCurrent}',
    photo_credential_front = '${photo_credential_front.pathCurrent}',
    photo_credential_revers = '${photo_credential_revers.pathCurrent}',
    updated_at = DEFAULT
    WHERE id = ${id}`

    connection.query(sql, async (err, _) => {
      if (err) {
        errorQuery(res, 400, err)
        return
      }
      const user = await queryByParamID(id, table)
      delete user[0].password

      jwt.sign({ user: user[0] }, secretPassword, { expiresIn: 84600 }, (_, token) => {
        const responseJson = new StructResponse({
          code: 200,
          message: `Credenciales cargadas con exito`
        }, {}, [{ token, user: user[0] }])

        res.status(200).json(responseJson)
      })
    })

  }, 3000)
}

const usersUpdateCertificate = (req, res) => {
  const data = req.body
  const id = parseInt(req.params.id, 10)
  const table = 'users'

  const sql = `UPDATE ${table} SET ?,
  updated_at = DEFAULT WHERE id = ${id}`

  connection.query(sql, data, async (err, _) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const user = await queryByParamID(id, table)
    delete user[0].password

    const responseJson = new StructResponse({
      code: 200,
      message: `usuario certificado correctamente`
    }, {}, user)

    res.status(200).json(responseJson)
  })
}

const usersUpdateActive = (req, res) => {
  const data = req.body
  const id = parseInt(req.params.id, 10)
  const table = 'users'

  const sql = `UPDATE ${table} SET ?,
  updated_at = DEFAULT WHERE id = ${id}`

  connection.query(sql, data, async (err, _) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const user = await queryByParamID(id, table)
    delete user[0].password

    const responseJson = new StructResponse({
      code: 200,
      message: `usuario activado/desactivado correctamente`
    }, {}, user)

    res.status(200).json(responseJson)
  })

}

const usersDelete = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'users'

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
      code: 200,
      message: `usuario eliminado correctamente`
    })
    res.status(200).json(responseJson)
  })
}

const usersSubscriptions = (id, subscriptionsId) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users 
    SET subscriptions_id = ${subscriptionsId}
    WHERE id = ${id}`

    connection.query(sql, (err, result) => {
      if (err) {
        return resolve(err)
      }
      return resolve(result)
    })
  })
}

module.exports = {
  usersGet,
  usersGetForApproval,
  userGET,
  usersCreate,
  usersUpdate,
  usersUpdateCredentials,
  usersUpdateCertificate,
  usersUpdateActive,
  usersDelete,
  usersSubscriptions
}
