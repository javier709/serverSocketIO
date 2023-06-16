// * Database Connection


const mysql = require('mysql');
require('dotenv').config();         // * Uso las variables de entorno que configure en el archivo .env

const {DB_HOST,DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const connection = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
});

module.exports = connection;