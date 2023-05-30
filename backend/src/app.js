const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/db.js');

const {API_VERSION, API_NAME} = process.env;

const app = express();

const http = require('http');
const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:4200'
    }
});


// * Import Routes

const userRoutes = require('./router/user.js');         // *  Hago disponibles los servicios del usuario
const messageRoutes = require('./router/message.js');   // * Hago disponibles los servicios de mensajes


app.use(express.urlencoded({extended: true}));        
app.use(express.json());                    // * Los datos enviados en una solicitud, los recupero en formato Json
app.use(express.static('src/uploads'));     // * Para poder utilizar/visualizar los archivos que se van a almacenar en uploads
app.use(cors());


app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
});

// * Export Routes

const basePath = `/${API_NAME}/${API_VERSION}`;
console.log(basePath);

app.use(basePath, userRoutes);
app.use(basePath,messageRoutes);

// * Escucho los eventos de socket

io.on('connect', (socket) =>{
    socket.on('disconnect', () => {
        console.log('Disconnect User');
    })
});

module.exports = httpServer;        // * httpServer contiene la información de socket.io
