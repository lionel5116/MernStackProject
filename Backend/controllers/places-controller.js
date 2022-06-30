const uuid = require('uuid').v4;
const {validationResult} = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');


let DUMMY_PLACES = [
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

const getPlaceById = (req,res,next) => {
    const placeID = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeID;
    });

   if(!place) {
    return res.status(404).json({message: 'Could not find a place for the provided id.'});
   }

    res.json({place});
}

const getPlacesByUserId = (req,res,next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if(!places || places.length === 0) {
        return res.status(404).json({message: 'Could not find places for the provided  user id.'});
    }

    res.json({places});
}

const createPlace = async (req,res,next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(500).json({message: 'Failed to add a place, missing required field information.'});
   }
   
   const {title,description,address, creator} = req.body;

   let coordinates = await getCoordsForAddress(address);

   const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    creator
   });


    await createdPlace.save().then(() => {
        res.status(201).json({place: createdPlace})
    })
    .catch((error) => {
        return res.status(500).json({message: 'Failed to add a place, missing required field information.' + error});
    });
  
};

const updatePlace = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(500).json({message: 'Failed to update a place, missing required field information.'});
    }

    const {title,description} = req.body;
    const placeId = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req,res,next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)) {
        return res.status(500).json({message: 'Place does not exist to delete!!!.'});
    }
    
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message:placeId + ' Deleted'})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
