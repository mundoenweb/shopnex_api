const createError = require('http-errors')
const { handlerVerifiyData, handlerVerifiyDataUpdate } = require('./utils/handlerVerifiyData')
const { handlerResponse } = require('../../utils/handlerResponse')
const { handlerMoveImage } = require('../../utils/handlerMoveImage')
const { modelCreateNews, modelGetAllNews, modelGetNews, modelUpdateNews, modelDeleteNews } = require('./newsModel')
const { handlerDeleteFile } = require('../../utils/handlerDeleteFile')
const queryByParam = require('../../utils/querys/queryByParam')

const createNews = async (req, res, next) => {
  const image = req.files?.image
  const data = req.body

  const error = handlerVerifiyData(data, image)
  if (error) return next(createError(400, error))

  const pathImage = await handlerMoveImage(image, 'news')
  if (pathImage.error) {
    const message = 'Lo sentimos hubo un error al cargar la imagen'
    next(createError(500, { message, ...pathImage }))
    return
  }
  modelCreateNews(data, pathImage)
    .then(news => {
      const message = 'Noticia creeada exitosamente'
      handlerResponse(res, news, 201, message)
    })
    .catch(err => {
      const message = 'Error al crear la noticia'
      handlerDeleteFile(pathImage)
      next(createError(500, { ...err, message }))
    })

}
const getAllNews = (req, res, next) => {
  modelGetAllNews()
    .then(news => {
      const message = 'Consulta exitosa'
      handlerResponse(res, news, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const getNews = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }
  modelGetNews(id)
    .then(news => {
      const message = 'Consulta exitosa'
      handlerResponse(res, news, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const updateNews = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  const image = req.files?.image
  const data = req.body
  let imagePath = ''
  
  const error = handlerVerifiyDataUpdate(data, id, image)
  if (error) return next(createError(400, error))

  if (image) {
    imagePath = await handlerMoveImage(image, 'news')
    if (imagePath.error) {
      const message = 'Lo sentimos hubo un error al cargar la imagen'
      next(createError(500, { message, ...imagePath }))
      return
    }
  }

  const news = await queryByParam(id, 'news', 'id')
  const oldImagePath = news[0].image

  modelUpdateNews(id, data, imagePath)
  .then(news => {
    const message = 'Noticia actualizada con exito'
    if (image) handlerDeleteFile(oldImagePath)
    handlerResponse(res, news, 200, message)
  })
  .catch(err => {
    const message = 'Error al actualizar la noticia'
    if (image) handlerDeleteFile(imagePath)
    next(createError(500, {...err, message}))
  })
}
const deleteNews = async (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  const news = await queryByParam(id, 'news', 'id')
  const oldImagePath = news[0].image

  modelDeleteNews(id)
  .then(() => {
    const message = 'Noticia eliminada exitosamente'
    handlerDeleteFile(oldImagePath)
    handlerResponse(res, null, 200, message)
  })
  .catch(err => {
    const message = 'Error al eliminar la noticia'
    next(createError(500, {...err, message}))
  })
}

module.exports = {
  createNews,
  getAllNews,
  getNews,
  updateNews,
  deleteNews
}
