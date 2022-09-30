const valideteDataLogged = (email, password) => {
    if(!email) return 'debe pasar un email'
    if(!password) return 'debe pasar una contraseña'
    return false
}

module.exports = valideteDataLogged
