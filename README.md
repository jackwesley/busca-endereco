# Busca Endereço

Esta API tem por finalidade buscar um endereço de acordo com um CEP informado. 

O CEP pode ser informado de duas formas:

Com traço e ponto:

```json
{
    zipCode: "37.500-192"
}
```

Ou apenas o CEP sem traço e ponto:
```
{
    zipCode: "37500192"
}
```
## Development

### Setup
Para o setup do ambiente de desenvolvimento siga os passos abaixo.
Clone este repositório para sua máquina local utilizando `https://github.com/jackwesley/busca-endereco.git`

### Install

```
npm install
```

### Start the database

```
npx sequelize db:migrate
```

### Run

```
npm start
```

### Test

```
npm test
```

## Docs API
Para chamadas na API é necessário criar um usuário na aplicação fazendo um post no endpoint: `http://localhost:3333/user` com o JSON abaixo aplicado ao corpo da requisição.
```
{
    "firstName": "Peter",
    "lastName": "Parker",
    "email": "peterp@mail.com.br",
    "password": "12345678"
}
```

Após criação do usuário é necessário gerar um token com o primeiro nome e email previamente cadastrados.
Faça um post para o endpoint:  `http://localhost:3333/authenticate` com o JSON abaixo aplicado ao corpo da requisição:
```
{
    "email": "teste@aranha.com",
    "password": "12345678"
} 
```

Para buscar o endereço de um CEP faça uma requisição ao endpoint: `http://localhost:3333/busca-endereco` com o JSON abaixo aplicado ao corpo da requisição.
Este endpoint necessita de autorização. Para ser autorizado informe no header desta chamada:

`
x-access-token: {token gerado no endpoint /autenticate}
`

```
{
     "zipCode": "37503193"          
}
```
O retorno de sucesso desta requisição será o endereço relacionado ao CEP conforme JSON:
```
{
    "rua": "Travessa Francisco Reinaldo de Mello",
    "bairro": "Vila Poddis",
    "cidade": "Itajubá",
    "estado": "MG"
}
```
Caso o CEP esteja válido e não seja encontrado um endereço relacionado, a API atualizará o CEP, substituindo o ultimo dígito mais a direita por zero(0).
Por exemplo caso o CEP `37501123` não possua um endereço cadastrado a API atualizará o CEP para o valor `37501120`, caso não encontre novamente substitui o próximo digito por zero, ficando da seguinte forma `37501100`, e assim sucessivamente até encontrar um endereço. Em caso de CEP inválido a API retornará a mensagem CEP Inválido.


### Swagger
Para acessar a documentação via swagger utilize o link: `http://localhost:3333/api-docs/`

