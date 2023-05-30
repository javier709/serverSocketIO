// * Los middlewares son funciones intermedias que deciden habilitar o no funciones finales

// * Función que verifica que el usuario esté autenticado

function userAuthenticated(req, res, next) {
    const {authorization} = req.headers;
    if(!authorization) return res.status(500).send({response: 'El token es requerido'});
    
    // * Obtengo el token de la cabecera

    const token = authorization.replace('Bearer', '');

    const userData = decodeToken(token);        // * Los datos del usuario vienen en el token, se decodifican y se guardan en la constante userData
    try{
        const {exp} = userData;         // * Extraigo la fecha de expiración de token
        const currentTime = new Date().getTime();
        if(exp < currentTime) return res.status(400).send({response: 'El token expiró'});   // * Si el token expiró, retornamos
        next();            // * Next habilita la ejecución de una función
    } catch (error){
        res.status(400).send({response: 'El token es inválido'});
    }
}

module.exports = {
    userAuthenticated
}