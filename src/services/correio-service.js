const CorreiosService = require('node-correios');
const correioService = new CorreiosService();

module.exports = {
    async fetchAdress(zipCode, exponent) {
        try {
            const address = await correioService.consultaCEP({ cep: zipCode });

            if (address.erro !== true) {
                return address;
            }
            else {
                if (exponent <= 7) {
                    let newZipCode = await this.correctZipCode(zipCode, exponent);
                    return await this.fetchAdress(newZipCode.toString(), exponent + 1);
                }
            }
        } catch (error) {
            return error;
        }
    },

    async correctZipCode(zipCode, exponent) {
        let factor = Math.pow(10, exponent);
        let zipCodeInt = Number(zipCode);
        let zipCodeToCorrect = Math.trunc(zipCodeInt / factor);
        let zipCodeToGo = zipCodeToCorrect * factor;

        return zipCodeToGo;
    },

    async removePointAndTrace(zipCode) {
        const zipCodeCleaned = zipCode.replace(/\.|\-/g, '');
        return zipCodeCleaned;
    },

    async validateZipCode(zipCode) {
        var contract = /^[0-9]{8}$/;

        return contract.test(zipCode);
    }

};