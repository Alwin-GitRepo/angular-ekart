const express = require('express')
const { getAllProducts, getProductInfoById } = require('../Controllers/productController')
const { addToWishlist } = require('../Controllers/wishlistController')
const jwtMiddleware = require('../Middleware/authMiddleware')

const router = express.Router() 

// get all products
router.get('/all-products', getAllProducts)
// get product info by id
router.get('/view/:id', getProductInfoById)



module.exports = router