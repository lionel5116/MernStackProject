const express = require('express');
//npm i express-validator
const {check} = require('express-validator');

const router = express.Router();

const placesControllers = require('../controllers/places-controller');

//  /api/places/<p1>
router.get('/:pid', placesControllers.getPlaceById);

// /api/places/user/<u1>
router.get('/user/:uid',placesControllers.getPlacesByUserId);


router.post("/", 
       [check("title").not().isEmpty(),
        check("description").isLength({min:5}),
        check("address").not().isEmpty(),
       ], 
       placesControllers.createPlace
       );

router.patch('/:pid',
        [check("title").not().isEmpty(),
        check("description").isLength({min:5})
       ], 
     placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace)

module.exports = router;