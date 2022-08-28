const express = require('express')
const router = express.Router()

const tratamentsRouter = require('../apiServices/trataments/tratamentsRouter')
const servicesRouter = require('../apiServices/services/servicesRouter')
const serveFileRouter = require('../apiServices/serveFiles/serveFilesRoutes')
const mercadopagoRouter = require('../services/mercadopago/mercadopagoRouter')
const emailRouter = require('../services/email/emailRouter')

router.use('/trataments', tratamentsRouter)
router.use('/services', servicesRouter)
router.use('/public', serveFileRouter)
router.use(mercadopagoRouter)
router.use(emailRouter)

module.exports = router
