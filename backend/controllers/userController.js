const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @des Register new user
//@route Post/api/users
//@access public
const registerUser =asyncHandler(async (req, res)=>{
    const {name, email, password} =req.body;

    if(!name|| !email|| !password){
        res.status(400)
        throw new Error("please add all fields")
    }
    //check if user exist
    const useExists = await User.findOne({email})

    if(useExists){
        res.status(400)
        throw new Error("user already exist");
    }

    //hash pasword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
    })
    } else{
        res.status(400)
        throw new  Error('invalid user data')
    }

}
) 
// @des Autenticate a user
//@route Post/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} =req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } else {
          res.status(400)
          throw new Error('Ivalid credentials')
    }
})


//@des get user data
//@route GET /api/users/me
//@access private
const getMe =asyncHandler(async (req, res)=>{
   res.status(200).json(req.user)
})

//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: '30d'})
}


module.exports= {
    registerUser,
    loginUser,
    getMe,


}