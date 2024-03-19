const mongoose = require('mongoose');
const userModel = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


// ----------------------------------------------------------------
// -----------------------  Register User -------------------------
const registerController = async(req,res) =>{
    const {username,email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(404).json({message:'User already registered'})
        }else{
            // new user is added to the database
            const newUser = userModel({username,email,password})
            await newUser.save()
            res.status(200).json({message:"User added successfully"})
        }
    } catch (error) {
        res
        .status(500)
        .json({message:"Error registering user"})
    }
}

// ----------------------------------------------------------------
// -----------------------  Login User ----------------------------
const loginController = async(req,res) =>{
    const {email,password} = req.body
   try {
    const existingUser =   await userModel.findOne({email})
    if(existingUser){
        if(existingUser.password !== password){
            return res.status(401).json({message:"Wrong password"})
        }
        const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1d'})
        existingUser.password = undefined
        res.status(200).json({existingUser,token}) //response for client
    }else{
        res.status(404).json({message:"Incorrect email or password"})
    }
   } catch (error) {
    res.status(500).json({message:"Error in Log In"})
   }
}

module.exports = {
    registerController,
    loginController
}