// * Hashing de password

const bcrypt = require('bcryptjs');

const fs = require('fs');

// * Función para hashear el password, recibe el password

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

// * Utilitario para las cortar el path de las imagenes y poder almacenarlas

function getFilePath(file){
    const path = file.path.split('\\');
    const fileName = path.pop();              // * Obtengo el último elemento del path
    const folder = path.pop();
    return `${folder}/${fileName}`;
}

// * Función para eliminar las imagenes que se cargan incorrectamente por petición POST, y no se almacenen en mi carpeta de uploads

function unlinkFile(path) {
    try {
        if (!path) throw new Error('No hay imagen para eliminar');
        fs.unlinkSync(`src/uploads/${path}`);
    } catch (error) {
        console.log(error);
    }
} 

module.exports = {
    hashPassword,
    getFilePath,
    unlinkFile
}