const express = require('express');

const router = express.Router();

const placesControllers = require('../controllers/places-controller');

//  /api/places/<p1>
router.get('/:pid', placesControllers.getPlaceById);

// /api/places/user/<u1>
router.get('/user/:uid',placesControllers.getPlaceByUserId);

router.post('/',placesControllers.createPlace)

module.exports = router;