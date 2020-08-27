const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    index(request, response) {
        const { cep } = request.body;

        correioService.consultaCEP({ cep: cep })
            .then(result => {
                return response.json(result);
            })
            .catch(error => {
                return response.json(error);
            });
    }
};