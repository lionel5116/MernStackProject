const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema ({
    title: { type: String, required: true},
    description: { type: String, required: true},
    image:{ type: String, required: true},
    address:{ type: String, required: true},
    location: {
        lat:{ type: Number, required: true},
        lng: { type: Number, required: true}
     },
     //this is how you do referencial integrity between two document object
     creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'} 
});

//The naming convention for our model: UpperCase FirstLetter,
//No S, Mongo DB will make it plural and also name the document as places
module.exports = mongoose.model('Place',placeSchema);
