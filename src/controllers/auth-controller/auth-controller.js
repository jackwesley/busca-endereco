const userRepository = require('../../repositories/user-repository');
const Validator = require('fastest-validator');
const authService = require('../../services/auth-service');

const contract = new Validator();

module.exports = {
    async authenticacte(request, response) {
        const login = request.body;

        const schema = {
            email: { max: 255, min: 5, type: 'string' },
            password: { max: 16, min: 6, type: 'string' }
        }

        const errors = contract.validate(login, schema);

        if (Array.isArray(errors) && errors.length) {
            return response.status(400).json(errors);
        }

        const user = await userRepository.authenticacte(login);

        if (user) {
            const token = await authService.generateToken({ email: user.email, firstName: user.firstName });
            return response.json({
                token: token,
                data: {
                    email: user.email, 
                    firstName: user.firstName
                }
            });
        } else {
            return response.status(404).json({ message: 'Usuário ou senha inválidos' });        }
    }
};