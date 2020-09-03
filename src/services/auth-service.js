const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user-repository');

module.exports = {
    async generateToken(data) {
        return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
    },

    async decodeToken(token) {
        let data = await jwt.verify(token, global.SALT_KEY);
        return data;
    },

    authorize(request, response, next) {
        let token = request.headers['x-access-token'];
        if (!token) {
            response.status(401).json({
                message: 'Acesso Restrito'
            })
        } else {
            jwt.verify(token, global.SALT_KEY, function (error, decoded) {
                if (error) {
                    response.status(401).json({
                        message: 'Token Invalido'
                    });
                } else {
                    var login = {
                        email: decoded.email,
                        password: decoded.password
                    }

                    const user = userRepo.authenticacte(login);
                    if (user) {
                        next();
                    }
                    else {
                        response.status(401).json({
                            message: 'Token Invalido'
                        });

                    }
                }
            });
        }
    }
};