const express = require('express')
const productsList = require('../controllers/products')

const router = express.Router()

router.get('/', productsList)

module.exports = router;