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

const getPlaceById = async  (req,res,next) => {
    const placeID = req.params.pid;
    //const place = Place.findById(placeID).exec()   --if you wanted to get a real promise back (use exec)
   
    let place;
    try {
       place = await Place.findById(placeID);
    }
    catch (error) {
        return res.status(500).json({message: 'There was a problem fetching the place by ID.'});
    }

    if(!place) {
        return res.status(404).json({message: 'Could not find a place for the provided id.'});
    }

    //res.json({place});
    res.json({place: place.toObject({getters: true})}); //we are using this syntax to bring back the _id as id on the returned result
}

const getPlacesByUserId = async (req,res,next) => {
    const userId = req.params.uid;
    
    let places;
    try{
        places = await Place.find({creator : userId}); //returns an array
    }
    catch(error)
    {
        return res.status(500).json({message: error});
    }
    
    if(!places || places.length === 0) {
        return res.status(404).json({message: 'Could not find places for the provided  user id.'});
    }

    //res.json({places});
    res.json({places: places.map(place => place.toObject({getters:true}))}); //we are using this syntax to bring back the _id as id on the returned result
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

const updatePlace = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(500).json({message: 'Failed to update a place, missing required field information.'});
    }

    const {title,description} = req.body;
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId)
    }
    catch(error) {
        return res.status(500).json({message: error});
    }

    place.title = title;
    place.description = description;

    try{
        await place.save();
    }
    catch(error) {
        return res.status(500).json({message: 'Could not update place.. something went wrong'});
    }
    

    //res.status(200).json({place: place})
    res.status(200).json({place: place.toObject({getters: true})}); //we are using this syntax to bring back the _id as id on the returned result
}

const deletePlace = async (req,res,next) => {
    const placeId = req.params.pid;
    let place;
    try {
       place = await Place.findById(placeId);
       if(!place) {
        return res.status(404).json({message: 'Could not find a place for the provided id.'});
       }
       await place.remove();
    }
    catch (error) {
        return res.status(500).json({message: 'Problem deleting a pace.'});
    }

    res.status(200).json({message:placeId + ' Deleted'})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
