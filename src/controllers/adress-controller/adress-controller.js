const correioService = require('../../services/correio-service');
module.exports = {
    async index(request, response) {
        const { zipCode } = request.body;
        const cleanZipCode = correioService.removePointAndTrace(zipCode);


        if (correioService.validateZipCode(cleanZipCode)) {
            try {
                var adress = await correioService.fetchAdress(cleanZipCode, 1);
                return response.json({ rua: adress.logradouro, bairro: adress.bairro, cidade: adress.localidade, estado: adress.uf })
            } catch (error) {
                return response.status(400).json({ message: 'Cep inválido' });
            }
        }

        return response.status(400).json({ message: 'Cep inválido' });
    }
};

