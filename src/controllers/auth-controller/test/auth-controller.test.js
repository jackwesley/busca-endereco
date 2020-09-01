const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);


jest.mock('../../../repositories/user-repository', () => ({
    authenticacte: jest.fn()
}));

const userRepository = require('../../../repositories/user-repository');

describe('auth-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("POST: /authenticate", () => {
        it('should return a Token and STATUS 200', async () => {
            userRepository.authenticacte.mockResolvedValue({
                id: 7,
                firstName: "Peter",
                lastName: "Parker",
                email: "teste@aranha.com",
                password: "4b9bd3851d4e39b3454460629da41ee3",
                updatedAt: "2020-08-30T16:26:26.151Z",
                createdAt: "2020-08-30T16:26:26.151Z",
            });

            const reqBody = {
                email: "teste@aranha.com",
                password: "12345678"
            };
            
           
            const response = await request.post('/authenticate').send(reqBody);

            expect(response.status).toBe(200);
            expect(response.body.token).not.toBeNull();            
        });

        it('should return error message of invalid user or password and STATUS 404', async () => {
            const reqBody = {
                email: "teste@aranha.com",
                password: "12345678"
            };
           
            const response = await request.post('/authenticate').send(reqBody);

            expect(response.status).toBe(404);
            expect(response.body).toEqual( { message: 'Usuário ou senha inválidos' });            
        });

    });

});
