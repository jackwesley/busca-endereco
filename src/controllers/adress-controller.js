const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    async index(request, response) {
        const { zipCode } = request.body;
        const cleanZipCode = removePontoETraco(zipCode);


        if (validateZipCode(cleanZipCode)) {
            try {
                var adress = await getAdress(cleanZipCode, 1);
                return response.json({ rua: adress.logradouro, bairro: adress.bairro, cidade: adress.localidade, estado: adress.uf })
            } catch (error) {
                return response.status(400).json({ message: 'Cep inválido' });
            }
        }

        return response.status(400).json({ message: 'Cep inválido' });
    }
};

async function getAdress(zipCode, exponent) {
    try {
        const adress = await correioService.consultaCEP({ cep: zipCode });
        if (adress.erro !== true) {
            return adress;
        }
        else {
            if (exponent <= 7) {

                let newZipCode = correctZipCode(zipCode, exponent);
                console.log(newZipCode);
                return getAdress(newZipCode.toString(), exponent + 1);
            }
        }
    } catch (error) {
        return error;
    }
}

function correctZipCode(zipCode, exponent) {
    let factor = Math.pow(10, exponent);
    let zipCodeInt = Number(zipCode);
    let zipCodeToCorrect = Math.trunc(zipCodeInt / factor);
    let zipCodeToGo = zipCodeToCorrect * factor;

    return zipCodeToGo;
}

function removePontoETraco(zipCode) {
    const zipCodeCleaned = zipCode.replace(/\.|\-/g, '');
    return zipCodeCleaned;
}

function validateZipCode(zipcode) {
    var contract = /^[0-9]{8}$/;

    return contract.test(zipcode);
}