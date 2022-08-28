const handlerResponse = (
  res, data = [], code, message = 'consulta exitosa'
) => {
  
  const objectResponse = {
    data,
    message,
    status: code
  }

  res.status(code)
  res.json(objectResponse)
}

module.exports = {
  handlerResponse
}
