const db = require('../_db/models/index');

module.exports = {
    async authenticacte(login) {
        const usuarioEncontrado = await db.User.findOne({
            where: {
                email: login.email,
                password: login.password
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