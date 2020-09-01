const correioService = require('../../services/correio-service');

describe('correio-service', () => {
    it('should return zip code with 8 characters', async () => {
        const zipCode = "37.503-192";
        const zipCodeWithoutPointAndTrace = await correioService.removePointAndTrace(zipCode);

        expect(zipCodeWithoutPointAndTrace.length).toEqual(8);
    });

    it('should return true with valid zip code', async () => {
        const zipCode = "37503192";
        const isValid = await correioService.validateZipCode(zipCode);

        expect(isValid).toEqual(true);
    });

    it('should return false with invalid zip code', async () => {
        const zipCode = "A12333343";
        const isValid = await correioService.validateZipCode(zipCode);

        expect(isValid).toEqual(false);
    });

    it('should return false with invalid zip code', async () => {
        const zipCode = "A12333343";
        const isValid = await correioService.validateZipCode(zipCode);

        expect(isValid).toEqual(false);
    });

    it('should return zip code with 0 in the last character', async () => {
        const code = "37503192";
        const zipCode = await correioService.correctZipCode(code, 1);

        expect(zipCode.toString()).toEqual("37503190");
    });

    it('should return zip code with 00 as last character', async () => {
        const code = "37503192";
        const zipCode = await correioService.correctZipCode(code, 2);

        expect(zipCode.toString()).toEqual("37503100");
    });
});