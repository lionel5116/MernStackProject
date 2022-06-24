const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
   {
     id: 'p1',
     title: 'Rick James Playboy Mansion ',
     description: 'I am RICK JAMES BITCH!!!',
     location: {
        lat:40.7859,
        lng: -9890
     },
     address:'2345 Pimp Daddy Drive',
     creator:'u1'
   }
];

//  /api/places/<p1>
router.get('/:pid', (req,res,next) => {
    const placeID = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeID;
    });
    res.json({place});
})

// /api/places/user/<u1>
router.get('/user/:uid', (req,res,next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    res.json({place});
})

module.exports = router;