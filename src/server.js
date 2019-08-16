const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

mongoose.connect(
   //'mongodb+srv://rmvsolutions:lorenna123@cluster0-6fif3.azure.mongodb.net/grilomotors?retryWrites=true&w=majority'
   'mongodb://apimongo:QyUwj3Ayrrc0PUrFdePHBCdLppY0JTLA5lxOs8x81C3u0aQSt1ezeUVUG8wj4RoGhB0WCuktxIH6zhS9aEKEFA==@apimongo.documents.azure.com:10255/?ssl=true'
   ,{
     
   useNewUrlParser: true 
        });



app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);

