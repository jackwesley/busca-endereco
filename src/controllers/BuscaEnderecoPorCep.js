const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    async index(request, response) {
        const { cep } = request.body;
        const cepLimpo = removePontoETraco(cep);


        if (validaCep(cepLimpo)) {
            try {
                var endereco = await buscaEndereco(cepLimpo, 1);
                return response.json({ rua: endereco.logradouro, bairro: endereco.bairro, cidade: endereco.localidade, estado: endereco.uf })
            } catch (error) {
                return response.status(400).json({ message: 'Cep inválido' });
            }
        }

        return response.status(400).json({ message: 'Cep inválido' });
    }
};

async function buscaEndereco(cep, expoente) {
    try {
        const endereco = await correioService.consultaCEP({ cep: cep });
        if (endereco.erro !== true) {
            return endereco;
        }
        else {
            if (expoente <= 7) {

                let cepNovo = corrigeCep(cep, expoente);
                console.log(cepNovo);
                return buscaEndereco(cepNovo.toString(), expoente + 1);
            }
        }
    } catch (error) {
        return error;
    }
}

function corrigeCep(cep, expoente){
    let fator = Math.pow(10, expoente);
    let cepInteiro = Number(cep);
    let cepCorrrecao = Math.trunc(cepInteiro / fator);
    let cepCorrigido = cepCorrrecao * fator;

    return cepCorrigido;
}

function removePontoETraco(cep) {
    const cepLimpo = cep.replace(/\.|\-/g, '');
    return cepLimpo;
}

function validaCep(cep) {
    var validaCep = /^[0-9]{8}$/;

    return validaCep.test(cep);
}