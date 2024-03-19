const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
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
    quantity:{
        type:Number,
        required: true
    },
    grandTotal:{
        type:Number,
        required: true
    },
})

const cartModel = mongoose.model('carts', cartSchema)

module.exports = cartModel