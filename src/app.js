const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/swagger');
const logger = require('./logger');
const pinoHttp = require('pino-http')(logger)


const app = express();
app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: false, customCss: '.swagger-ui .topbar {display: none}'}));
app.use(express.json());
app.use(pinoHttp);
app.use(routes);

module.exports = app;