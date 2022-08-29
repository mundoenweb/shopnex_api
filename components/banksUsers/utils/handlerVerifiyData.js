const handlerVerifiyData = (data) => {
  const { users_id, banks_id, number_count, number_count_cci } = data
  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (!users_id) {
    return 'Debe pasar el id ded usuario'
  } else if (typeof users_id !== "number") {
    return 'el id del usuario debe ser un número'
  }

  if (!banks_id) {
    return 'Debe pasar el id del banco'
  } else if (typeof banks_id !== "number") {
    return 'el id del banco debe ser un número'
  }
  
  if (!number_count) {
    return 'Debe pasar el número de cuenta'
  } 

  if (!number_count_cci) {
    return 'Debe pasar el número de cuenta CCI'
  } 
  return null
}

const handlerVerifiyDataUpdate = (data, id) => {
  const { banks_id, number_count, number_count_cci } = data
  
  if (!id) {
    return 'favor pase un id valido en la url'
  }

  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (banks_id === '') {
    return 'Debe pasar el id del banco'
  } else if (banks_id && typeof banks_id !== "number") {
    return 'el id del banco debe ser un número'
  }
  
  if (number_count === '') {
    return 'Debe pasar el número de cuenta'
  } else if (number_count && typeof number_count !== "string") {
    return 'el numero de cuenta solo puede ser números en texto'
  }

  console.log(number_count_cci)
  if (number_count_cci === '') {
    return 'Debe pasar el número de cuenta CCI'
  } else if (number_count_cci && typeof number_count_cci !== "string") {
    return 'el cci solo puede ser números en texto'
  }

  return null
}

module.exports = {
  handlerVerifiyData,
  handlerVerifiyDataUpdate
}
