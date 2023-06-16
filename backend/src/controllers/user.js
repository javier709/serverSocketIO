const { response } = require('express');
const User = require('../models/user.js');
const { getFilePath, unlinkFile } = require('../utils/auth.js');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../utils/jwt.js');

// * User.get espera la conexion a la base de datos con los usuarios de los usuarios.

module.exports = {

    // * Función para listar los usuarios

    index: (req, res) => {
        User.get(req.con,(error,rows) => {
            if(error) {
                res.status(500).send ({response: 'Ha ocurrido un error listando los usuarios'});        // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            } else {
                res.status(200).send({response:rows});          // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            }
        })
    },

    // * Función para crear usuario, pide la conexión, el cuerpo de la solicitud, y devuelve los campos del usuario 

    store: (req,res) => {
        req.body.img = '';              // * Si la imagen que quiero almacenar en la BD, viene con un string vacío, le agrego la ruta de la imagen
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }
        User.create(req.con, req.body, (error, row) =>{
            if(error) {
                unlinkFile(req.body.img);
                res.status(500).send ({response: 'Ha ocurrido un error creando el usuario'});        // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            } else {
                res.status(200).send({response:row});          // * Paso la respuesta como un objeto, para poder consumirlo desde el front
            }
        });
    },

    login: (req, res) => {
        const {email,password} = req.body;     // * Recupero el email y password del body
        User.getByEmail(req.con, email, (error, rows) => {
            if (error) {
                res.status(500).send({response: 'Ha ocurrido un error obteniendo el usuario'});
            } else {       
                const userData = rows[0];
                console.log(userData);

                // * Validaciones, comparo las contraseñas que me pasa el usuario desde el formulario Login, con mi base de datos
           
                bcrypt.compare(password, userData.password, (error, check) => {
                    if(error) return res.status(500).send({response: 'Error en el servidor'});
                    if(!check) return res.status(400).send({response: 'Datos incorrectos'});
                    if(!userData.active) return res.status(401).send({response: 'Usuario inactivo'});
                    delete userData.password;                       // * Elimino el password para no enviarlo en la solicitud, solo envío el password hasheado
                    res.status(200).send({                          // * Si todo es correcto, envío un objeto con el token de acceso del usuario
                        response: {
                            token: createAccessToken(userData),
                            refresh:createRefreshToken(userData)              // * Datos del usuario
                        }
                    });
                });

            }
        });
    }
}