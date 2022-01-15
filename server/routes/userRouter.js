const router = require('express').Router()
const { userController } = require('../app/controllers')
const { auth } = require('../app/middlewares')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken)
router.get('/information', auth, userController.getUser)


module.exports = router