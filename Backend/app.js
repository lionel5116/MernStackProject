//npm start  (see your package.json - we are using nodemon for hot re-load (npm install nodemon))

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const placesRoutes = require('./routes/places-route')
const userRoutes = require('./routes/users-route');

const app = express();

app.use(bodyParser.json());
/*
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
*/

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader('Allow-Control-Allow-Methods','GET,POST,PATCH,DELETE');
  next();
});



app.use('/api/places',placesRoutes); //=> /api/places/...
app.use('/api/users',userRoutes); //=> /api/users/...

//add some middleware to handle invalid URL requests (THIS WORKS!!!)
app.use((req,res,next) => {
    const error = 'Could not locate the URL from request';
    res.status(500);
    res.json({message: error})
})

//below we changed the collection from places to mern once we went back the front-end - 7/7/2022
mongoose
  .connect('mongodb+srv://lionel5116:Mag17615%40@cluster0.jwcnt.mongodb.net/mern?retryWrites=true&w=majority')
  .then( () => {
    console.log('Connected to Mongo DB.. App Starting on PORT 5000')
    app.listen(5000);
  })
  .catch(err => {
    console.log(err)
  });

