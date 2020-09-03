const userRepository = require('../../repositories/user-repository');
const Validator = require('fastest-validator');
const md5 = require('md5');
const logger = require('../../logger');
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

        logger.error({ erros });

        if (Array.isArray(erros) && erros.length) {
            logger.error({ request: request, errors: erros });

            return response.status(400).json(erros);
        }

        try {
            const userCreated = await userRepository.create({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                password: md5(request.body.password + global.SALT_KEY)
            });

            logger.info({ request: request, response: userCreated });

            return response.json(userCreated);

        } catch (error) {
            logger.error({ request: request, error: error });
            
            response.status(500).send({
                message: 'Falha ao processar sua requisição',
                data: error
            });
        }
    }
};