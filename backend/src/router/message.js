const express = require('express');
const messageController = require('../controllers/message.js');
const { userAuthenticated } = require('../middleware/auth.js');

const app = express.Router();


// * Llamo a las funciones de mi controlador para listar, crear y eliminar mensajes

app.get('/messages', userAuthenticated ,messageController.index);        // * Verifico que el usuario esté autenticado para realizar la petición

app.post('/messages/create',userAuthenticated ,messageController.store);

app.delete('/messages/:id', userAuthenticated , messageController.destroy);

module.exports = app;


