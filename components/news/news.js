const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const getNews = (req, res) => {
  const sql = 'SELECT * FROM news ORDER BY created_at DESC'

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
const getOneNews = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'news'

  const sql = `SELECT * FROM ${table} WHERE id = ${id}`

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
const postCreateNews = (req, res) => {
  const image = req.files.file
  const data = req.body
  const table = 'news'
  const extension = image.name.split('.')[1]
  image.name = `${image.md5}.${extension}`

  image.mv(`./files/news/${image.name}`, (err) => {
    if (err) {
      errorQuery(res, 500, err, 'error al cargar la imágen')
      return
    }
    image.pathCurrent = `/files/news/${image.name}`

    const sql = `INSERT INTO ${table} 
    SET ?, image = '${image.pathCurrent}'`

    connection.query(sql, data, async (err, result) => {
      if (err) {
        errorQuery(res, 500, err)
        return
      }
      const news = await queryByParamID(result.insertId, table)
      const response = new StructResponse({
        code: 200,
        message: `noticia creada con exito`
      }, {}, news)
      res.status(200).json(response)
    })
  })
}
const putNews = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const image = req.files.file
  const data = req.body
  const table = 'news'
  const extension = image.name.split('.')[1]
  image.name = `${image.md5}.${extension}`

  image.mv(`./files/news/${image.name}`, (err) => {
    if (err) {
      errorQuery(res, 500, err, 'error al cargar la imágen')
      return
    }
    image.pathCurrent = `/files/news/${image.name}`

    const sql = `UPDATE ${table} 
    SET ?, image = '${image.pathCurrent}', updated_at = DEFAULT 
    WHERE id = ${id}`

    connection.query(sql, data, async (err, result) => {
      if (err) {
        errorQuery(res, 500, err)
        return
      }
      const news = await queryByParamID(id, table)
      const response = new StructResponse({
        code: 200,
        message: `noticia actualizada con exito exito`
      }, {}, news)
      res.status(200).json(response)
    })
  })

 
}
const deleteNews = (req, res) => {

  const id = parseInt(req.params.id, 10)
  const table = 'news'

  const sql = `DELETE FROM ${table} WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  }

  connection.query(sql, async (err, _) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: `noticia eliminada correctamente`
    })
    res.status(200).json(responseJson)
  })
}

module.exports = {
  getNews,
  getOneNews,
  postCreateNews,
  putNews,
  deleteNews
}
