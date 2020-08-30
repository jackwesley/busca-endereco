const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);


jest.mock('../../../repositories/user-repository', () => ({
    create: jest.fn()
}));


const userRepository = require('../../../repositories/user-repository');


describe('user-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });


    describe("POST: /user", () => {
        it('should create user', async () => {
            userRepository.create.mockResolvedValue({
                id: 7,
                firstName: "Peter",
                lastName: "Parker",
                email: "teste@aranha.com",
                password: "4b9bd3851d4e39b3454460629da41ee3",
                updatedAt: "2020-08-30T16:26:26.151Z",
                createdAt: "2020-08-30T16:26:26.151Z",
            });

            const reqBody = {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const response = await request.post('/user').send(reqBody);

            expect(response.status).toBe(200);
            expect(response.id).not.toBeNull();
            expect(userRepository.create).toHaveBeenCalledTimes(1);
        });

        it('should return an error message with first name empty and STAUTS 400', async () => {
            const reqBody = {
                firstName: '',
                lastName: 'Parker',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const response = await request.post('/user').send(reqBody);


            expect(response.status).toBe(400);
            expect(response.body).toEqual([{
                type: "stringMin",
                message: "The 'firstName' field length must be greater than or equal to 1 characters long.",
                field: "firstName",
                expected: 1,
                actual: 0
            }]);
        });

        it('should return an error message with last name empty and STATUS 400', async () => {
            const reqBody = {
                firstName: 'Peter',
                lastName: '',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const response = await request.post('/user').send(reqBody);

            expect(response.status).toBe(400);
            expect(response.body).toEqual([{
                type: "stringMin",
                message: "The 'lastName' field length must be greater than or equal to 1 characters long.",
                field: "lastName",
                expected: 1,
                actual: 0
            }]);
        });

        it('should return an error message with email less than five characters', async () => {
            const reqBody = {
                firstName: 'Peter',
                lastName: 'Parker',
                email: '',
                password: '12345678'
            };

            const response = await request.post('/user').send(reqBody);

            expect(response.status).toBe(400);
            expect(response.body).toEqual([{
                type: "stringMin",
                message: "The 'email' field length must be greater than or equal to 5 characters long.",
                field: "email",
                expected: 5,
                actual: 0
            }]);
        });

        it('should return an error message with password less than 6 characters', async () => {
            const reqBody = {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'mail@gmail.com',
                password: '128'
            };

           const response = await request.post('/user').send(reqBody);

            expect(response.status).toBe(400);
            expect(response.body).toEqual([{
                type: "stringMin",
                message: "The 'password' field length must be greater than or equal to 6 characters long.",
                field: "password",
                expected: 6,
                actual: 3
            }]);
        });

    });
});
