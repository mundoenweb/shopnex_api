const valideteDataLogged = (email, password) => {
  return new Promise((resolve, _) => {

    if(!email) return resolve('debe pasar un email')
    if(!password) return resolve('debe pasar una contraseña')
    resolve(false)
  })
}

module.exports = valideteDataLogged
