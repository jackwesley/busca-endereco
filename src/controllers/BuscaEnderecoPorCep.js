const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    async index(request, response) {
        const { cep } = request.body;
        const cepLimpo = removePontoETraco(cep);


        if (validaCep(cepLimpo)) {
            try {
                var endereco = await buscaEndereco(cepLimpo, 7);
                return response.json({ rua: endereco.logradouro, bairro: endereco.bairro, cidade: endereco.localidade, estado: endereco.uf })
            } catch (error) {
                return response.status(400).json({ message: 'Cep inválido' });
            }
        }

        return response.status(400).json({ message: 'Cep inválido' });
    }
};


async function buscaEndereco(cep, indice) {
    try {
        const endereco = await correioService.consultaCEP({ cep: cep });
        if (endereco.erro !== true) {
            return endereco;
        }
        else {

            if (indice >= 1) {
                var cepCorrigido = adicionaZeroAoCepNaoEncontrado(cep, indice);
                console.log(cepCorrigido)
                indice = indice - 1;
                return buscaEndereco(cepCorrigido, indice);
            }
        }
    } catch (error) {
        return error;
    }
}


function adicionaZeroAoCepNaoEncontrado(cep, indice) {

    if (cep[indice] === "0" && indice > 0) {
        return adicionaZeroAoCepNaoEncontrado(cep, indice - 1);
    }
    else {
        resultado = replaceAt(cep, indice, "0");
        return resultado;
    }
}


function replaceAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function removePontoETraco(cep) {
    const cepLimpo = cep.replace(/\.|\-/g, '');
    return cepLimpo;
}

function validaCep(cep) {
    var validaCep = /^[0-9]{8}$/;

    return validaCep.test(cep);
}