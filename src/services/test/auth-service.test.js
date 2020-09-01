const authService = require('../../services/auth-service');
const app = require('../../app');

describe('auth-service', () => {
    it('should return token ', async () => {
        const data = {
            firstName: 'John',
            email: 'johnwick@mail.com'
        }
        const token = await authService.generateToken(data);
        console.log(token);

        expect(token).not.toBeNull();
    });

    it('should return token ', async () => {
        const data = {
            firstName: 'John',
            email: 'johnwick@mail.com'
        }

        const token = await authService.generateToken(data);

        const decoded = await authService.decodeToken(token);

        console.log(decoded);

        expect(decoded.firstName).toEqual('John');
        expect(decoded.email).toEqual('johnwick@mail.com');
    });

});