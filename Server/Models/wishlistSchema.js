const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    id:{
        type:Number,
        required: true,
        unique:true,
    },
    userId:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    
})

const wishlistModel = mongoose.model('wishlist', wishlistSchema)

module.exports = wishlistModel