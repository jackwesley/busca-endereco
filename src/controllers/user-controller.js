const userRepository = require('../repositories/user-repository');
const Validator = require('fastest-validator');

const contract = new Validator();

module.exports = {
    async create(request, response) {
        const user = request.body;

        const schema = {
            firstName: { max: 60, min: 1, type: 'string' },
            lastName: { max: 60, min: 1, type: 'string' },
            email: { max: 255, min: 5, type: 'string' },
            password: { max: 16, min: 6, type: 'string' }
        }

        const erros = contract.validate(user, schema);

        if (Array.isArray(erros) && erros.length) {
            return response.status(400).json(erros);
        }

        try {

            const userCreated = await userRepository.create(user);
            return response.json(userCreated);

        } catch (error) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição',
                data: e
            });
        }
    }
};