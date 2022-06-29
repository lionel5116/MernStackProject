
const {validationResult} = require('express-validator');

const uuid = require('uuid').v4;

const DUMMY_USERS = [
    {
        id:'u1',
        name:'Rick James',
        email: 'slickrick@gail.com',
        password:'cocaine'
    }
]

const getUsers = (req,res,next) => {
   res.status(200);
   res.json({users: DUMMY_USERS});
}

const signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(500).json({message: 'Failed to add a user, missing required field information.'});
    }

    const {name,email,password} = req.body;

   const hasUer = DUMMY_USERS.find(u => u.email === email);
   if(hasUer) {
    res.status(500).json({message:'Email already exists'});
     return;
   }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201);
    res.json({message: 'User Created'});

}

const login = (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(500).json({message: 'Validation on inputs failed.'});
    }

    const {email,password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        res.status(500).json({message:'Could not locate user'});
    }
    else{
        res.status(200).json({message:'SUCCESS'});
    }

}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;