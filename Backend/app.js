//npm start  (see your package.json - we are using nodemon for hot re-load (npm install nodemon))

const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-route')

const app = express();

app.use('/api/places',placesRoutes); //=> /api/places/...

app.listen(5000);