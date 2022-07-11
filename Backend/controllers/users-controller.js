
const {validationResult} = require('express-validator');
const uuid = require('uuid').v4;
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id:'u1',
        name:'Rick James',
        email: 'slickrick@gail.com',
        password:'cocaine'
    }
]

const getUsers = async (req,res,next) => {
    let users;
    
     try {
        users = await User.find({}, '-password');  //return everything except the password
     } catch (error) {
        return res.status(500).json({message: 'Users not found. -' + error});
     }

   res.status(201).json({user: users.map(user =>user.toObject({getters:true}))});
   
}

const signup = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(500).json({message: 'Failed to add a user, missing required field information.'});
    }

    const {name,email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});

    } catch (error) {
        return res.status(500).json({message: 'Signup Failed'});
    }
   
    if(existingUser){
        return res.status(500).json({message: 'User exists already.. please login instead..'});
    }
    

    const createdUser = new User({
      name,
      email,
      image:'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      password,
      places:[]
    });

    
    await createdUser.save().then(() => {
        //res.status(201).json({user: createdUser})
        res.status(201).json({user: createdUser.toObject({getters: true})});
    })
    .catch((error) => {
        return res.status(500).json({message: 'Failed to sign up user. please try again: -' + error});
    });

    res.status(201);
    //res.json({message: 'User Created'});

}

const login = async(req,res,next) => {

    const {email,password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email : email});

    } catch (error) {
        return res.status(500).json({message: 'Loggin in failed... check your email and password '});
    }
   
    if(!existingUser || existingUser.password!== password){
        return res.status(500).json({message: 'Invalid Credentials'});
    }

    res.status(200)
    res.status(200).json({message:'Logged In'});

}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;