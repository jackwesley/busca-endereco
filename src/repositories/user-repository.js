const db = require('../_db/models/index');
const md5 = require('md5');

module.exports = {
    async authenticacte(login) {
        console.log(SALT_KEY);
        const usuarioEncontrado = await db.User.findOne({
            where: {
                email: login.email,
                password: md5(login.password + global.SALT_KEY)
            }
        });

        return usuarioEncontrado;
    },

    async create(usuario) {
        try {
            const usuarioCriado = await db.User.create(usuario);
            return usuarioCriado;
        } catch (error) {
            return error;
        }

    }
};