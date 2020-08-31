const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

// jest.mock('../../../services/auth-service', () => ({
//     generateToken: jest.fn()
// }));

jest.mock('../../../repositories/user-repository', () => ({
    authenticacte: jest.fn()
}));

const authService = require('../../../services/auth-service');
const userRepository = require('../../../repositories/user-repository');


describe('auth-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe("POST: /authenticate", () => {
        it('should create token', async () => {
            userRepository.authenticacte.mockResolvedValue({
                id: 7,
                firstName: "Peter",
                lastName: "Parker",
                email: "teste@aranha.com",
                password: "4b9bd3851d4e39b3454460629da41ee3",
                updatedAt: "2020-08-30T16:26:26.151Z",
                createdAt: "2020-08-30T16:26:26.151Z",
            });

            // authService.generateToken.mockResolvedValue(
            //     'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgZG8gZm9ydW0gZGEgQWx1cmEiLCJzdWIiOiIxIiwiaWF0IjoxNTk1NDYyMTExLCJleHAiOjE1OTU1NDg1MTF9.yMQQKD-pgcYh0a-4b_6ZULfKnUmtmcvWcA6gbxywHd8'
            // );

            const reqBody = {
                email: "teste@aranha.com",
                password: "12345678"
            };
            
            const token = await authService.generateToken(reqBody);

            console.log(authService.generateToken(reqBody));
            // expect(response.status).toBe(200);
            // expect(response.id).not.toBeNull();
            // expect(userRepository.create).toHaveBeenCalledTimes(1);
        });

    });

});
