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
     creator: { type: String, required: true},
});

//The naming convention for our model: UpperCase FirstLetter,
//No S, Mongo DB will make it plural and also name the document as places
module.exports = mongoose.model('Place',placeSchema);
