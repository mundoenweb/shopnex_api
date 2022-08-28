const handlerVerifiyData = (data) => {
  const { name } = data
  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (name === undefined) {
    return 'El nombre del banco es requerido'
  } else if (typeof name !== "string") {
    return 'El nombre del banco debe ser solo texto'
  }

  return null
}

const handlerVerifiyDataUpdate = (data) => {
  const { name, active } = data

  if (!Object.entries(data).length) {
    return resolve('Debe pasar los datos requeridos')
  }

  console.log("name", name)
  if (name == '') {
    return 'El nombre del banco es requerido'
  } else if (name && typeof name !== "string") {
    return 'El nombre del banco debe ser solo texto'
  }

  if (active && typeof active !== "boolean") {
    return 'active debe pasar un boolean'
  }

  return null
}

module.exports = {
  handlerVerifiyData,
  handlerVerifiyDataUpdate
}
