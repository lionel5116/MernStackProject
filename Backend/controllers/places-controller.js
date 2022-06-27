const uuid = require('uuid').v4;

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

const getPlaceByUserId = (req,res,next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if(!place) {
        return res.status(404).json({message: 'Could not find a place for the provided  user id.'});
    }

    res.json({place});
}

const createPlace = (req,res,next) => {
   const {title,description,coordinates, address, creator} = req.body;
   const createdPlace = {
     id: uuid(),
     title,
     description,
     location: coordinates,
     address,
     creator,
   };

   DUMMY_PLACES.push(createdPlace);
   res.status(201).json({place: createdPlace})

};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
