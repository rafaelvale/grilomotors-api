const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const UsuariosController = require('./controller/UsuariosController');
const CarrosController = require('./controller/CarrosController');
const FotosController = require('./controller/FotosController');
const LikeController = require('./controller/LikeController');
const DislikeController = require('./controller/DislikeController');




const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/login', UsuariosController.index);
routes.post('/login', UsuariosController.store);
routes.get('/carros', CarrosController.index);
routes.post('/carros',upload.single('fotos'), CarrosController.store);
routes.post('/fotos/:carroID',upload.single('fotos'),FotosController.store);
routes.post('/user/:userID/likes', LikeController.store);
routes.post('/user/:userID/dislikes', DislikeController.store);

module.exports = routes;
