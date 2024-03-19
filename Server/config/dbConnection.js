const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
.then((res)=>{
    console.log('Mongo db connection established');
})
.catch((err)=>{
    console.log('Mongo db connection error, error: ' + err.message);
})
