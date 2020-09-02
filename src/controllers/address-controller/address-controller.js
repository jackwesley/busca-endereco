const correioService = require('../../services/correio-service');
const logger = require('../../logger');


module.exports = {
    async index(request, response) {
        const { zipCode } = request.body;
        const cleanZipCode = await correioService.removePointAndTrace(zipCode);

        const isValid = await correioService.validateZipCode(cleanZipCode)

        if (isValid) {
            try {
                var address = await correioService.fetchAdress(cleanZipCode, 1);
                logger.info({
                    request: request.body,
                    response: address
                });

                return response.json({
                    rua: address.logradouro,
                    bairro: address.bairro,
                    cidade: address.localidade,
                    estado: address.uf
                });

            } catch (error) {
                logger.error({
                    request: request.body,
                    error: error
                });
                return response.status(400).json({ message: 'Cep inválido' });
            }
        }
        logger.error({
            request: request.body
        });
        return response.status(400).json({ message: 'Cep inválido' });
    }
};

