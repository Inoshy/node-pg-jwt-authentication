const { Router } = require('express')
const control = require('../controllers/auth')
const middleware = require('../middleware/auth')

const router = Router()

router.use('/user/register', (req, res, next) => {
  middleware.is_auth(req, res, next)
})

router.get('/user/register', control.get_register)

router.post('/user/register', control.post_register)

router.use('/user/login', (req, res, next) => {
  middleware.is_auth(req, res, next)
})

router.get('/user/login', control.get_login)

router.post('/user/login', control.post_login)

router.use('/user/control', (req, res, next) => {
  middleware.require_control(req, res, next)
})

router.get('/user/control', control.get_user_control)

module.exports = router
