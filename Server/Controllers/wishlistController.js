const WishlistModel = require("../Models/wishlistSchema");
const mongoose = require("mongoose");

// Add to wishlist
const addToWishlist = async (req, res) => {
  const { id, title, price, image } = req.body;
  const userId = req.payload;

  try {
    // check produt in wishlist
    const item = await WishlistModel.findOne({ id, userId });
    if (item) {
      res.status(409).json({ message: "Product already in wishlist" });
    } else {
      // add to wishlist
      const newProduct = new WishlistModel({
        id,
        title,
        price,
        image,
        userId,
      });
      // store to db
      await newProduct.save();
      res.status(200).json({ message: "Product added in wishlist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all products in wishlist
const fetchWishlistOfUser = async (req, res) => {
  const userId = req.payload;
  try {
    const wishlistData = await WishlistModel.find({ userId });
    if (wishlistData) {
      res.status(200).json(wishlistData);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// remove product from wishlist
const removeFromWishlist = async (req, res) => {
  const productId = req.params.id;
  const userId = req.payload;
  try {
    const item = await WishlistModel.deleteOne({ id: productId, userId });
    if (item.deletedCount === 1) {
      res.status(200).json({ message: "Product removed from wishlist"  });
    } else {
      res.status(404).json({ message: "Product not found in wishlist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToWishlist,
  fetchWishlistOfUser,
  removeFromWishlist
};
