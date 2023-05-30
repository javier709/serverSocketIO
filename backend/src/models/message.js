// * Servicio para los mensajes


module.exports = {

    get: (con, callback) => {
        con.query('SELECT * FROM messages', callback);
    },

    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages WHERE id = ${id}`, callback);
    },

    // * Script para crear un usuario, información que se recibe y la que se envía a la base de datos

    create: (con, data, callback) => {
        con.query(`
        INSERT INTO messages SET
        content = '${data.content}',
        userId = '${data.userId}'`
        , callback);
    },

    // * Eliminar mensajes

    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages WHERE id = ${id}`, callback);
    },
}