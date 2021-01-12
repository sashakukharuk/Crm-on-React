const express = require('express')
const controller = require('../controlles/muggers')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router