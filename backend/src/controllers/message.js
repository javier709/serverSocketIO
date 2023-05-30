// * Controlador para los mensajes

const Message = require('../models/message.js');


// * User.get espera la conexion a la base de datos con los usuarios de los usuarios.

module.exports = {

    // * Función que hace que cada vez que se emita un mensaje, podemos ver los registros

    index: (req, res) => {
        _getMessages(req,res);

    },

    // * Función para crear los mensajes, pide la conexión, el cuerpo de la solicitud, y devuelve los campos del mensaje

    store: (req,res) => {
        Message.create(req.con, req.body, (error) =>{
            if(error) {
                res.status(500).send ({response: 'Ha ocurrido un error creando el mensaje'});        // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            } else {
                _getMessages(req, res);
            }
          
        });
    },

    // * Función para eliminar los mensajes

    destroy: (req,res) => {
        const { id } = req.params;                  // * Recupero el ID del usuario desde PARAMS
        Message.destroy(req.con, id , (error) =>{
            if(error) {
                res.status(500).send ({response: 'Ha ocurrido un error al eliminar el mensaje'});        // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            } else {
                _getMessages(req, res);
            }
          
        });
    },
}

// * Creo una función privada para obtener los mensajes

function _getMessages(req,res){
    Message.get(req.con, (error, rows) => {
        if(error) {
            res.status(500).send ({response: 'Ha ocurrido un error listando los usuarios'});        // * Paso la respuesta como un objeto, para poder consumirlo desde el front
        } else {
            const { io } = req;
            io.emit('messages', rows);                  // * Cada vez que necesito recuperar los mensajes, se emite un evento messages, donde puedo recuperar todos los registros
            res.status(200).send({response:rows});          // * Paso la respuesta como un objeto, para poder consumirlo desde el front
        }
    });
}