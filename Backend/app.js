//npm start  (see your package.json - we are using nodemon for hot re-load (npm install nodemon))

const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-route')
const userRoutes = require('./routes/users-route');

const app = express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); //=> /api/places/...
app.use('/api/users',userRoutes); //=> /api/users/...

//add some middleware to handle invalid URL requests (THIS WORKS!!!)
app.use((req,res,next) => {
    const error = 'Could not locate the URL from request';
    res.status(500);
    res.json({message: error})
})

app.listen(5000);