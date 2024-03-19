const express = require('express')
const { registerController, loginController } = require('../Controllers/userController')
const jwtMiddleware = require('../Middleware/authMiddleware')
const { addToWishlist, fetchWishlistOfUser, removeFromWishlist } = require('../Controllers/wishlistController')
const { addToCartController, fetchCartProducts, removeFromCart, incrementCart, decrementCart } = require('../Controllers/cartController')
const router = express.Router()

// register user
router.post('/register',registerController)
// login user
router.post('/login',loginController)

// addd to wishlist
router.post('/wishlist/add',jwtMiddleware, addToWishlist)

// view wishlist
router.get('/wishlist/view',jwtMiddleware, fetchWishlistOfUser)
// remove from wishlist
router.delete('/wishlist/:id',jwtMiddleware, removeFromWishlist)

// add to cart
router.post('/cart/add',jwtMiddleware, addToCartController)

// view cart products
router.get('/cart/view',jwtMiddleware, fetchCartProducts)

// remove from wishlist
router.delete('/cart/:id',jwtMiddleware, removeFromCart)

// increment cart product
router.put('/cart/increment/:id',jwtMiddleware,incrementCart)
// decrement cart product
router.put('/cart/decrement/:id',jwtMiddleware,decrementCart)

module.exports = router