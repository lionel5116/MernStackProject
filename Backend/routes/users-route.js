const express = require('express');
//npm i express-validator
const {check} = require('express-validator');
const router = express.Router();

const usersControllers = require('../controllers/users-controller');

//  /api/users/
router.get('/', usersControllers.getUsers);

router.post('/signup',
        [check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({min:6}),
        ], 
         usersControllers.signup);

router.post('/login',
        [
        check("email").not().isEmpty(),
        check("password").not().isEmpty(),
        ], 
     usersControllers.login);


module.exports = router;