// * Modelos para las solicitudes a la base de datos.

const { hashPassword } = require("../utils/auth.js");

module.exports = {

    get: (con, callback) => {
        con.query('SELECT * FROM users', callback);
    },

    getById: (con, id, callback) => {
        con.query(`SELECT * FROM users WHERE id = ${id}`, callback);
    },

    getByEmail: (con, email, callback) => {
        con.query(`SELECT * FROM users WHERE email = '${email}'`, callback);        // * El email es un string, se coloca entre ''
    },

    // * Script para crear un usuario, información que se recibe y la que se envía a la base de datos

    create: (con, data, callback) => {
        con.query(`
        INSERT INTO users SET
        firstName = '${data.firstName}',
        lastName = '${data.lastName}',
        email = '${data.email.toLowerCase()}',
        password = '${hashPassword(data.password)}',
        roleId = '${typeof data.roleId !== 'undefined' ? data.roleId : 2}',
        img = '${data.img}',
        active = '${typeof data.active !== 'undefined' ? data.active : 1}'
        `, callback);
    },
}