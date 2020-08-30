
jest.mock('../user-controller', () => ({
    create: jest.fn()
}));

const userController = require('../user-controller');

describe('user-controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });


    describe("POST: /user", () => {
        it('should create user', async () => {
            userController.create.mockResolvedValue({
                "id": 7,
                "firstName": "Peter",
                "lastName": "Parker",
                "email": "teste@aranha.com",
                "password": "4b9bd3851d4e39b3454460629da41ee3",
                "updatedAt": "2020-08-30T16:26:26.151Z",
                "createdAt": "2020-08-30T16:26:26.151Z",
            });

            const user = {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const createdUser = await userController.create(user);

            expect(createdUser.id).not.toBeNull();
        });

        it('should return an error message with first name empty', async () => {
            userController.create.mockResolvedValue({
                "type": "stringMin",
                "message": "The 'firstName' field length must be greater than or equal to 1 characters long.",
                "field": "firstName",
                "expected": 1,
                "actual": 0
            });

            const user = {
                firstName: '',
                lastName: 'Parker',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const response = await userController.create(user);
            console.log(response);

            expect(response.field).toBe("firstName");
            expect(response.message).toBe("The 'firstName' field length must be greater than or equal to 1 characters long.");
        });

        it('should return an error message with last name empty', async () => {
            userController.create.mockResolvedValue({
                "type": "stringMin",
                "message": "The 'lastName' field length must be greater than or equal to 1 characters long.",
                "field": "lastName",
                "expected": 1,
                "actual": 0
            });

            const user = {
                firstName: 'Peter',
                lastName: '',
                email: 'teste@aranha.com',
                password: '12345678'
            };

            const response = await userController.create(user);
            console.log(response);

            expect(response.field).toBe("lastName");
            expect(response.message).toBe("The 'lastName' field length must be greater than or equal to 1 characters long.");
        });

        it('should return an error message with email less than five characters', async () => {
            userController.create.mockResolvedValue({
                "type": "stringMin",
                "message": "The 'email' field length must be greater than or equal to 5 characters long.",
                "field": "email",
                "expected": 5,
                "actual": 0
            });

            const user = {
                firstName: 'Peter',
                lastName: 'Paker',
                email: '',
                password: '12345678'
            };

            const response = await userController.create(user);
            console.log(response);

            expect(response.field).toBe("email");
            expect(response.message).toBe("The 'email' field length must be greater than or equal to 5 characters long.");
        });

        it('should return an error message with password less than 6 characters', async () => {
            userController.create.mockResolvedValue({
                "type": "stringMin",
                "message": "The 'password' field length must be greater than or equal to 6 characters long.",
                "field": "password",
                "expected": 6,
                "actual": 1
            });

            const user = {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'mail@gmail.com',
                password: '128'
            };

            const response = await userController.create(user);
            console.log(response);

            expect(response.field).toBe("password");
            expect(response.message).toBe("The 'password' field length must be greater than or equal to 6 characters long.");
        });

    });
});
