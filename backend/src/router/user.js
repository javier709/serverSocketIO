const express = require('express');
const multiparty = require('connect-multiparty');
const userController = require('../controllers/user.js');

const mdUserImg = multiparty({uploadDir: 'src/uploads/users'});

const app = express.Router();


// * Llamo a las funciones de mi controlador para listar usuarios, crear usuarios

app.get('/users', userController.index);

app.post('/users/create',mdUserImg, userController.store);

app.post('/messages/login', mdUserImg, userController.login);

module.exports = app;