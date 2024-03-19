require('dotenv').config()
const cors = require('cors')
const express = require('express');
const ecartServer = express();
const productRoutes = require('./Routes/productRouter');
const userRoutes = require('./Routes/userRouter');
require('./config/dbConnection')  //mongodb connection

// ---------------------------- PORT------------------------------------
const port  = process.env.PORT || 5000

ecartServer.use(cors())
ecartServer.use(express.json())

// routes --------------------------------
ecartServer.use('/products',productRoutes)
ecartServer.use('/user',userRoutes)


ecartServer.get('/', (req, res) =>{
    res.send('Api running successfully')
})

// listen --------------------------------
ecartServer.listen(port,()=>console.log("server connected to port: "+port))
