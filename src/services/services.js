const db = require('../_db/models/index');

module.exports = {
    async auth(usuario) {
        const usuarioEncontrado = await db.User.findOne({
            where: {
                email: usuario.email,
                password: usuario.password
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