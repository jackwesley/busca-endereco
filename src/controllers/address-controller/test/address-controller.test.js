const supertest = require('supertest');
const app = require('../../../app');
const authService = require('../../../services/auth-service');
const request = supertest(app);

jest.mock('../../../services/correio-service', () => ({
    fetchAdress: jest.fn(),
    correctZipCode: jest.fn(),
    removePointAndTrace: jest.fn(),
    validateZipCode: jest.fn()
}));

const correioService = require('../../../services/correio-service');

describe('adress-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe('POST: /fetch-address/', () => {
        it('should return an address', async () => {
            correioService.fetchAdress.mockResolvedValue({
                logradouro: "Rua Benedito Messias",
                bairro: "Vila Poddis",
                localidade: "Itajubá",
                uf: "MG"
            });

            correioService.removePointAndTrace.mockResolvedValue("37503192");
            correioService.validateZipCode.mockResolvedValue(true);
            correioService.correctZipCode.mockResolvedValue("37503192");

            const reqBody = {
                email: "teste@aranha.com",
                password: "12345678"
            };
            
            const token = await authService.generateToken(reqBody);

            const payload =
            {
                zipCode: '37503192'
            };

            const response = await request.post('/fetch-address')
               .send(payload)
               .set('x-access-token', token);

            expect(response.body).toEqual({
                bairro: "Vila Poddis", 
                cidade: "Itajubá", 
                estado: "MG", 
                rua: "Rua Benedito Messias"});
        });

        it('should return an error message when zipcode is invalid', async () => {
            correioService.fetchAdress.mockResolvedValue({
                rua: "Rua Benedito Messias",
                bairro: "Vila Poddis",
                cidade: "Itajubá",
                estado: "MG"
            });

            correioService.removePointAndTrace.mockResolvedValue("A1223");
            correioService.validateZipCode.mockResolvedValue(false);
            correioService.correctZipCode.mockResolvedValue("A1223");

            const reqBody = {
                email: "teste@aranha.com",
                password: "12345678"
            };
            
            const token = await authService.generateToken(reqBody);

            const payload =
            {
                zipCode: 'A1223'
            };

            const response = await request.post('/fetch-address')
               .send(payload)
               .set('x-access-token', token);

            expect(response.body).toEqual({
                message: "Cep inválido"
            });
        });
    });
});