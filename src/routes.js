const express = require('express');
const adressController = require('./controllers/adress-controller');
const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const authService = require('./services/auth-service');

const routes = express.Router();


/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
  *   userAuthenticate:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /busca-endereco:
 *   post:
 *     summary: Busca um endereço.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: Token para habilitar a busca
 *         in: header
 *         required: true
 *         type: string  
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             zipCode:
 *               type: string
 *               required: true
 *               example: "37503192"
 *         required:
 *           - body
 *     responses:
 *       '200':
 *         description: Success.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Success.
 *       '401':
 *         description: Invalid auth token provided.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Invalid auth token provided.
 *       '400':
 *         description: Bad request.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Bad request.
 *       '404':
 *         description: Not Found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Not Found.
 */
routes.post('/busca-endereco', authService.authorize, adressController.index);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cadastra usuário.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               required: true
 *               example: John
 *             lastName:
 *               type: string
 *               required: true
 *               example: Wick
 *             email:
 *               type: string
 *               required: true
 *               example: meuemail@mail.com
 *             password:
 *               type: string
 *               required: true
 *               example: "12345678"
 *         required:
 *           - body
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User created successfully.
 *       '400':
 *         description: Bad Request.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Bad Request.
 */
routes.post('/user', userController.create);

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Gera token para usuário cadastrado.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *               example: meuemail@mail.com
 *             password:
 *               type: string
 *               required: true
 *               example: "12345678"
 *         required:
 *           - body
 *     responses:
 *       '200':
 *         description: Success.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Success.
 *       '400':
 *         description: Bad Request.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Bad Request.
 *       '404':
 *         description: Not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Not found.
 */
routes.post('/authenticate', authController.authenticacte);


routes.get('/health', (_, res) => res.sendStatus(200));


module.exports = routes;