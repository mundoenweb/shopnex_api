const mercadopago = require('mercadopago')
const createError = require('http-errors')

const private_token = {
  test: 'TEST-2449446393848597-112506-6a1395b97a5388d339c38f838f03a470-794238892',
  production: 'APP_USR-2449446393848597-112506-1e008541abc48611562eb755f71a2d77-794238892'
}
mercadopago.configure({
  access_token: private_token.test,
});


const pay = (req, res, next) => {
  const preference = req.body

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json(response.body.id)
    })
    .catch(function (error) {
      next(createError(error.status, error))
    });
    
}

module.exports = pay
