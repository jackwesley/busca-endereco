const supertest = require('supertest');
const app = require('../../../app');
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

    describe('POST: /busca-endereco/', () => {
        it('should return an adress', async () => {
            correioService.fetchAdress.mockResolvedValue({
                logradouro: "Rua Benedito Messias",
                bairro: "Vila Poddis",
                localidade: "Itajubá",
                uf: "MG"
            });

            correioService.removePointAndTrace.mockResolvedValue("37503192");
            correioService.validateZipCode.mockResolvedValue(true);
            correioService.correctZipCode.mockResolvedValue("37503192");

            const payload =
            {
                zipCode: '37503192'
            };

            const response = await request.post('/busca-endereco')
               .send(payload)
               .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1ldWVtYWlsQG1haWwuY29tIiwiZmlyc3ROYW1lIjoiSm9obiIsImlhdCI6MTU5ODc1MjI1NywiZXhwIjoxNTk4ODM4NjU3fQ.Cc3r9Rnj3ynv0B_xOUApNwLZk7z1kYo7EyVGjj34KVA');

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

            const payload =
            {
                zipCode: 'A1223'
            };

            const response = await request.post('/busca-endereco')
               .send(payload)
               .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1ldWVtYWlsQG1haWwuY29tIiwiZmlyc3ROYW1lIjoiSm9obiIsImlhdCI6MTU5ODc1MjI1NywiZXhwIjoxNTk4ODM4NjU3fQ.Cc3r9Rnj3ynv0B_xOUApNwLZk7z1kYo7EyVGjj34KVA');

            expect(response.body).toEqual({
                message: "Cep inválido"
            });
        });
    });
});