const express = require("express");
const laboratory = require("./Modules/laboratorySchema");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors=require('cors')




const authenticate = require('./middleware/auth')
const app = express();
require("./dbConnection/conn");
//JSON middleware
app.use(express.json());
//cookie middleware
app.use(cookieParser());
//cors middleware
app.use(cors())

const controller = require('./controller/controller');

  app.post("/register",authenticate, controller.register);
  
  app.post('/login', controller.login)
  
  app.get('/userrecords',authenticate, controller.getUserRecords)

  app.put('/updatethyroid',authenticate, controller.putThyroidData)
  
  app.get('/createtest',authenticate, controller.getCreateTest)
  
  app.post('/createtest',authenticate, controller.postCreatetest)
  
  app.post('/heamatology',authenticate, controller.postHeamatology)
  
  app.post('/thyroid',authenticate, controller.postThyroid)
  
  app.post('/glucometry',authenticate, controller.postGlucometry)

  module.exports = app