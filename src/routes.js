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
 */

/**
 * @swagger
 * /busca-endereco:
 *   post:
 *     description: Retorna o endereço de acordo com o CEP informado
 *     parameters:
 *       - zipCode: CEP
 *         description: CEP a ser buscado
 *         in: body
 *         required: true
 *         type: string
 *       - x-access-token: x-access-token
 *         description: Token para habilitar a busca
 *         in: head
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Resposta de sucesso
 */
routes.post('/busca-endereco', authService.authorize, adressController.index);

/**
 * @swagger
 * /user:
 *  post:
 *    description: Este endpoint é responsável por cadastrar um usuário no sistema
 *    parameters:
 *       - name: firstName
 *         description: Primeiro nome
 *         in: body
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: Ultimo Nome
 *         in: body
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: Senha
 *         in: body
 *         required: true
 *         type: string 
 *         schema:
 *           $ref: '#/definitions/user'
 *    responses: 
 *       '200':
 *        description: Retorno com sucesso
 *       '400':
 *        description: Requisição má formatada
 */
 
routes.post('/user', userController.create);

/**
 * @swagger
 * /authenticate:
 *  post:
 *    description: Este endpoint é responsável por gerar o token de autenticação para o usuário já cadastrado
 *    responses: 
 *       '200':
 *        description: Retorno com sucesso
 */
routes.post('/authenticate', authController.authenticacte);


routes.get('/health',  (_, res) => res.sendStatus(200));


module.exports = routes;