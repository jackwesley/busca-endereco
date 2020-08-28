const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    async index(request, response) {
        const { cep } = request.body;


        if (validaCep(cep)) {
            const cepLimpo = removerCaracteresEspeciais(cep);
            try {
                const endereco = await correioService.consultaCEP({ cep: cepLimpo });

                return response.json({ rua: endereco.logradouro, bairro: endereco.bairro, cidade: endereco.localidade, estado: endereco.uf });

            } catch (error) {
                return response.json(error);
            }
        }
        else {
            return response.status(400).json({ message: 'Cep invalido' });
        }


    }
};

function removerCaracteresEspeciais(cep) {
    const cepLimpo = cep.replace(/[^0-9]/g, '');
    return cepLimpo;
}

function validaCep(cep) {

    if (cep.length > 10) {
        return false;
    }

    return true;
}