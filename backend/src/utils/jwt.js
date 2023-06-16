const jwt = require ('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;


// * Función para crear el token de acceso del usuario, va a contener la firma, y recibe los datos del usuario

function createAccessToken(user) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);                 // * El token es válido por 5 horas
    return jwt.sign(_tokenPayload(user,expiration), JWT_SECRET_KEY);
}

// * Refresh token, dura un mes

function createRefreshToken(user) {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);                 // * El nuevo token es válido por 1 mes
    return jwt.sign(_tokenPayload(user,expiration), JWT_SECRET_KEY);
}

// * Función para decodificar el token

function decodeToken(token) {
    return jwt.decode(token, JWT_SECRET_KEY);
}

// * Creación del token, con función privada

function _tokenPayload(user, expiration, tokenType = 'token') {
    return {
        tokenType,
        user,
        iat: new Date().getTime(),
        exp: expiration.getTime()
    }
}

module.exports ={
    createAccessToken,
    createRefreshToken,
    decodeToken
}