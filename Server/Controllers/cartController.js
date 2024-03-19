const { default: mongoose } = require("mongoose");
const CartModel = require("../Models/cartSchema");

// add to cart controller
const addToCartController = async (req, res) => {
  // product details details
  const { id, title, price, image,quantity } = req.body;
  const userId = req.payload;
  try {
    // check if the product is already in cart
    const existingProduct = await CartModel.findOne({ id, userId });
    if (existingProduct) {
      // update the product quantity
      existingProduct.quantity += 1;
      // update the product grandTotal
      existingProduct.grandTotal =
        existingProduct.price * existingProduct.quantity;
      // save to db
      existingProduct.save();
      // send response to client
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      // add product to db
      const newProduct = new CartModel({
        id,
        title,
        price,
        image,
        userId,
        quantity,
        grandTotal: price,
      });
      await newProduct.save();
      return res.status(200).json({ message: "Product added successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};


// fetch cart products
const fetchCartProducts = async (req, res) => {
  const userId = req.payload
  try {
    const cartProducts = await CartModel.find({userId:userId})
    res.status(200).json(cartProducts)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// remove from cart products
const removeFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.payload;
  try {
    const item = await CartModel.deleteOne({ id: productId, userId });
    if (item.deletedCount === 1) {
      res.status(200).json({ message: "Product removed from cart"  });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// increment Cart
const incrementCart = async (req, res) => {
  const {id} = req.params
  const userId = req.payload
  try {
    const item = await CartModel.findOne({id,userId})
    item.quantity = item.quantity+1
    item.grandTotal = item.price * item.quantity
    item.save();
    const allProducts = await CartModel.find({userId})
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// decrement Cart
const decrementCart = async (req, res) => {
  const {id} = req.params
  const userId = req.payload
  try {
    const item = await CartModel.findOne({id,userId})
    if(item.quantity >1){
      item.quantity = item.quantity-1
      item.grandTotal = item.price * item.quantity
      item.save();
      const allProducts = await CartModel.find({userId})
      res.status(200).json(allProducts);
    }else{
      await CartModel.deleteOne({id,userId})
      res.status( 204).json({message:"Quantity is 0"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addToCartController,
  fetchCartProducts,
  removeFromCart,
  incrementCart,
  decrementCart
};
