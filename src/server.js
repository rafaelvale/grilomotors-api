const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

mongoose.connect(
   'mongodb+srv://rmvsolutions:lorenna123@cluster0-6fif3.azure.mongodb.net/grilomotors?retryWrites=true&w=majority'
 
   ,{
     
   useNewUrlParser: true 
        });



app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);


