const handlerVerifiyData = (data) => {
  const { name } = data

  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (!name) {
    return 'Debe pasar el nombre del rol'
  } else if (typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  return null
}

const handlerVerifiyDataUpdate = (data, id) => {
  const { name } = data
  
  if (!id) {
    return 'favor pase un id valido en la url'
  }
  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (name === '') {
    return 'Debe pasar el nombre del rol'
  } else if (typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  return null
}

module.exports = {
  handlerVerifiyData,
  handlerVerifiyDataUpdate
}
