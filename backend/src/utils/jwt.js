const jwt = require ('jsonwebtoken');
const {JWT_SECRET_KET} = process.env;


// * Función para crear el token de acceso del usuario, va a contener la firma

function createAccessToken(user) {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 5);                 // * El token es válido por 5 horas
    return jwt.sign(_tokenPayload(user,expiration), JWT_SECRET_KET);
}

// * Refresh token

function createRefreshToken(user) {
    const expiration = new Date();
    expiration.setMonth(expiration.getMonth() + 1);                 // * El nuevo token es válido por 1 mes
    return jwt.sign(_tokenPayload(user,expiration), JWT_SECRET_KET);
}

// * Función para decodificar el token

function decodeToken(token) {
    return jwt.decode(token, JWT_SECRET_KET);
}

// * Creación del token

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