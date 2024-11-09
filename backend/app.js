const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userroutes = require('./routes/user-routes');
const bookroutes = require('./routes/book-routes')
const genreroutes = require('./routes/genre-routes');
const authorroutes = require('./routes/author-routes')
const rentalroutes = require('./routes/rental-routes')
const membershiproutes = require('./routes/membership-routes')
const HttpError = require('./http-error');
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs')

app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-type, Accept, Authorization');
  res.setHeader("Access-Control-Allow-Methods","GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  next();
})

app.use('/api/users',userroutes)
app.use('/api/book',bookroutes)
app.use('/api/genre',genreroutes)
app.use('/api/author',authorroutes)
// app.use('/api/rental',rentalroutes)
// app.use('/api/membership',membershiproutes)

//middleware to handle unimplemented routes or path
app.use((req,res,next)=>{
  const error = new HttpError('could not find this route',404);
  throw error;
})

//error handling middleware
/*this is a middleware function express applies on every incoming request if function
is passed with four parmeters express will treat this as special function or error handling function
this function will only be executed if the request is having error attached to it */
app.use((err, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    });
  }
  if(res.headerSent){
      return next(err)
  }
  res.status(err.code || 500);
  res.json({message: err.message} || 'An unknown error occurred!')
})


mongoose.connect('mongodb+srv://tinuaju1923:tqWpPOo4xJzGwOBw@tvdatabase.h0u25.mongodb.net/Book_Rental_System?retryWrites=true&w=majority&appName=TVDatabase')
.then(()=>{
  app.listen(5000);
}).catch(err=>{
  console.log(err);
})
