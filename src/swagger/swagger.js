const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Busca Endereço API',
            desciption: 'Esta API tem por finalidade a busca de endereço a partir de um CEP',
            contact: {
                name: 'Jack Wesley Moreira'
            },
            securityDefinitions: {
                tokenauth: {
                    type: 'apiKey',
                    name: 'x-access-token',
                    in: 'header'
                },
                basicauth: {
                    type: 'basic'
                }
            },
            servers: ['http://localhost:3333']
        }
    },
    apis: ['./src/routes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;

