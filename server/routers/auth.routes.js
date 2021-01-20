const router = require('express').Router()
const authControllers =  require('../controllers/Auth.controllers')

router.get('/', authControllers.getUsers)

router.post('/', authControllers.registerUser)

module.exports = router