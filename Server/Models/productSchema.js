const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id:{
        type:Number,
        required: true,
        unique:true,
    },
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    Image:{
        type:String,
        required: true
    },
    rating:{
        rate:{
            type:Number,
            required: true
        },
        count:{
            type:Number,
            required: true
        },
    },
    
})

const products = mongoose.model('products', productSchema)

module.exports = products