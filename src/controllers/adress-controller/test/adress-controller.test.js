jest.mock('../adress-controller', () => ({
    index: jest.fn()
}));

const adressController = require('../adress-controller');

describe('adress-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe('POST: /busca-endereco/', () => {
        it('should return a adress', async () => {
            adressController.index.mockResolvedValue({
                rua: "Rua Benedito Messias",
                bairro: "Vila Poddis",
                cidade: "Itajubá",
                estado: "MG"
            });

            const payload = {
                zipcode: '37503192'
            };

            const response = await adressController.index(payload);

            expect(response).toEqual({
                "rua": "Rua Benedito Messias",
                "bairro": "Vila Poddis",
                "cidade": "Itajubá",
                "estado": "MG"
            });
        });

        it('should return an error message when zipcode is invalid', async () => {
            adressController.index.mockResolvedValue({
                message: "Cep inválido"
            });

            const payload = {
                zipcode: 'A03192'
            };

            const response = await adressController.index(payload);

            expect(response).toEqual({
                message: "Cep inválido"
            });
        });
    });
});