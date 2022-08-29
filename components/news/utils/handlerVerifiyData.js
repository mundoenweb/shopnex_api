const handlerVerifiyData = (data, image) => {
  const { name, description } = data

  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (!name) {
    return 'Debe pasar el nombre de la noticia'
  } else if (typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  if (!description) {
    return 'Debe pasar la descripción de la noticia'
  } else if (typeof description !== "string") {
    return 'la descripción solo puede ser texto'
  }

  if (!image) {
    return 'Se requiere una imágen'
  }
  

  return null
}

const handlerVerifiyDataUpdate = (data, id, image) => {
  const { name, description } = data
  
  if (!id) {
    return 'favor pase un id valido en la url'
  }
  if (!Object.entries(data).length && !image) {
    return 'Debe pasar los datos requeridos'
  }

  if (name === '') {
    return 'Debe pasar el nombre de la noticia'
  } else if (name && typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  if (description === '') {
    return 'Debe pasar la descripción de la noticia'
  } else if (description && typeof description !== "string") {
    return 'la descripción solo puede ser texto'
  }

  return null
}

module.exports = {
  handlerVerifiyData,
  handlerVerifiyDataUpdate
}
