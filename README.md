# Busca Endereço

Esta API tem por finalidade buscar um endereço de acordo com um CEP informado. 

O CEP pode ser informado de duas formas:

Com traço e ponto:

```json
{
    "zipCode": "37.500-192"
}
```

Ou apenas o CEP sem traço e ponto:
```json
{
    "zipCode": "37500192"
}
```
## Desenvolvimento

### Setup
Para o setup do ambiente de desenvolvimento siga os passos abaixo.
Clone este repositório para sua máquina local utilizando `https://github.com/jackwesley/busca-endereco.git`

### Instalar todos os pacotes necessários

```
npm install
```

### Inicializar o banco de dados

```
npx sequelize db:migrate
```

### Iniciar a aplicação

```
npm start
```

### Iniciar bateria de testes

```
npm test
```

## Documentação da API
Para chamadas na API é necessário criar um usuário na aplicação fazendo um post no endpoint: `http://localhost:3333/user` com o JSON abaixo aplicado ao corpo da requisição.

```json
{
    "firstName": "Peter",
    "lastName": "Parker",
    "email": "peterp@mail.com.br",
    "password": "12345678"
}
```

Após criação do usuário é necessário gerar um token com o primeiro nome e email previamente cadastrados.
Faça um post para o endpoint:  `http://localhost:3333/authenticate` com o JSON abaixo aplicado ao corpo da requisição:

```json
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

```json
{
     "zipCode": "37503193"          
}
```

O retorno de sucesso desta requisição será o endereço relacionado ao CEP conforme JSON:

```json
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
Para acessar a documentação via swagger utilize o link: `http://localhost:3333/api-docs`

### Saúde da aplicação
Para verificar a saúde da aplicação, ou seja, se ela está disponível use o link: `http://localhost:3333/health`
Se a API se encontrar em um status "saudável" este endpoint retornará o STATUS 200 Ok.

# Extras 
Esta API foi desenvolvida com Node.js, utilizando banco de dados Sqlite3. A razão da escolha dessas tecnologias se dá pelo fato de ser uma tarefa simples, o que acabaria ficando um pouco mais complexo tanto o código como o número de arquivos para desenvolver a mesma proposta utilizando uma linguagem fortemente tipada. 
Para criação desta aplicação levou-se em conta o padrão de MVC (Model, View, Controller).
Utilizando boas práticas de programação como SOLID.

# Protocolo HTTP 
O protocolo HTTP(*Hypertext Transfer Protocol*) é um protocolo que permite a comunicação entre um cliente e um servidor utilizando um modelo de *request*(pedido) e *response*(resposta). Onde o cliente que se interessa por um site hospedado em um servidor, faz uma requisição de dados e caso exista no servidor ele retorna com a resposta das informações contidas nele. É importante lembrar que a conexão não é persistente, ou seja, a cada nova requisição de informação uma nova conexão é criada e todo ciclo de requisição/resposta é repetido.
Os componentes para se fazer a comunicação são request e response já mencionados. 
Para o request temos os seguintes componentes
    1.Request(pedido)
        1.1-Linha de pedido: 
            Identificador do Método: (get/post)
            URI do recurso: seria o caminho para onde vai a requisição.
            Versão do protocolo
        1.2-Cabeçalho
            Cabeçalho Geral 
            Cabeçalho de Requisição
            Cabeçalho de Entidade
        1.3-Corpo/Mensagem

    2.Response(resposta)
        2.1-Linha de Status
            Versão do Protocolo
            Código numérico do Status
            Texto associado ao Status
        2.2-Cabeçalho
        2.3-Corpo/Mensagem


O protocolo HTTP funciona da seguinte forma.
    1- O cliente(navegador) se conecta a um servidor e faz uma requisição HTTP de uma página desejada.
    2- O servidor ao receber esta requisição, faz uma verificação se o conteúdo requisitado existe.
    3- Caso exista ele retorna as informações para o cliente que pode mostrar em forma de imagens, texto e outras mídias.
    4- Caso não exista geralmente é exibida uma mensagem de erro HTTP 404 - Not Found(não encontrado).