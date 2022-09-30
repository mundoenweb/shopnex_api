const handlerVerifiyData = (data) => {
  const {
    name,
    subscriptions_id,
    description,
    contract,
    cost
  } = data

  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (!name) {
    return 'Debe pasar el nombre de la tarea'
  } else if (typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  if (!subscriptions_id) {
    return 'Debe pasar el id a la subscripción que pertenece la tarea'
  } else if (typeof subscriptions_id !== "number") {
    return 'El id de la subscripción debe ser un número'
  }

  if (!cost) {
    return 'Debe pasar el costo de la tarea'
  } else if (typeof cost !== "number") {
    return 'El costo debe ser un número'
  }

  if (!description) {
    return 'Debe pasar la descripción de la tarea'
  } else if (typeof description !== "string") {
    return 'La descripción solo puede ser texto'
  }

  if (!contract) {
    return 'Debe pasar el contrato de la tarea'
  } else if (typeof contract !== "string") {
    return 'La contrato solo puede ser texto'
  }

  return null
}

const handlerVerifiyDataUpdate = (data, id) => {
  const {
    name,
    subscriptions_id,
    description,
    contract,
    cost,
    active
  } = data

  if (!id) {
    return 'favor pase un id valido en la url'
  }
  if (!Object.entries(data).length) {
    return 'Debe pasar los datos requeridos'
  }

  if (name === '') {
    return 'Debe pasar el nombre del rol'
  } else if (name && typeof name !== "string") {
    return 'el nombre solo puede ser texto'
  }

  if (subscriptions_id === '' || subscriptions_id === 0) {
    return 'Debe pasar el id a la subscripción que pertenece la tarea'
  } else if (subscriptions_id && typeof subscriptions_id !== "number") {
    return 'El id de la subscripción debe ser un número'
  }

  if (cost === '' || cost === 0) {
    return 'Debe pasar el costo de la tarea'
  } else if (cost && typeof cost !== "number") {
    return 'El costo debe ser un número'
  }

  if (description === '') {
    return 'Debe pasar la descripción de la tarea'
  } else if (description && typeof description !== "string") {
    return 'La descripción solo puede ser texto'
  }

  if (contract === '') {
    return 'Debe pasar el contrato de la tarea'
  } else if (contract && typeof contract !== "string") {
    return 'La contrato solo puede ser texto'
  }

  if (active === '') {
    return 'Debe un bool para el status de la tarea'
  }

  return null
}

module.exports = {
  handlerVerifiyData,
  handlerVerifiyDataUpdate
}
