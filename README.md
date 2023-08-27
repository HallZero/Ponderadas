# Ponderadas
Contains proposed solutions for the evaluated exercises

# 1. Ponderada 1

Passos para a criação da imagem:

Criando um ambiente virtual:

```bash
python3 -m venv venv
source /venv/bin/activate
mkdir src && cd src
```

Instalando as dependências:

```bash
pip install fastapi
pip install "uvicorn[standard]"
pip freeze > requirements.txt
```

Após a criação do Dockerfile, executar os seguintes comandos no terminal:

```bash
docker build -t python-img .
docker run -p 3000:80 --name fastapi-server python-img

```

O container já está rodando nossa aplicação em FASTAPI 🥳!

Publicando a imagem no Dockerhub:

```bash
docker login
docker tag python-img hallzero/inteli:0.0.x
docker push hallzero/inteli:0.0.x
```

# 2. Ponderada 2

Este projeto propõe uma solução para o exercício ponderado 2 utilizando express como API, sequelize como ORM, postgres para o Banco de Dados, e HTML puro (Até o momento) para o frontend.

# Arquivo docker-compose.yaml - Explicação

Este arquivo `docker-compose.yaml` contém a definição de um ambiente Docker composto por dois serviços: um banco de dados PostgreSQL e uma API Express.

## Serviço `db` - Banco de Dados PostgreSQL

Este serviço utiliza a imagem oficial do PostgreSQL versão 15.4. Ele fornece um banco de dados persistente para a aplicação.

## Serviço `api` - API Express

Este serviço utiliza uma imagem chamada `hallzero/express-p2:latest`, contendo uma aplicação Express para a API.

## Como Usar

1. Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.
2. Clone este repositório para sua máquina, se ainda não o tiver feito.
3. Navegue até o diretório onde o arquivo `docker-compose.yaml` está localizado.
4. Execute o comando `docker-compose up -d` para iniciar os serviços em segundo plano.
5. Os serviços serão iniciados e a API estará disponível em `http://localhost:3000`.

# Arquivo database.js - Explicação

Este arquivo contém a configuração e a definição dos modelos de dados utilizando o módulo Sequelize para interagir com um banco de dados PostgreSQL.

## Conexão com o Banco de Dados

O código inicia importando os módulos `Sequelize` e `DataTypes` do pacote 'sequelize'. Em seguida, uma instância do Sequelize é criada para se conectar ao banco de dados PostgreSQL. As configurações de conexão incluem o nome do banco de dados, o nome de usuário, a senha, o host e a porta.

A função `sequelize.authenticate()` é usada para verificar se a conexão com o banco de dados é bem-sucedida. Se a autenticação for bem-sucedida, uma mensagem "Connected to the database" será exibida. Caso contrário, um erro será logado.

## Modelos de Dados

### Modelo 'User'

O primeiro modelo definido é 'User', que representa informações de um usuário. Ele possui as seguintes colunas:

- `id`: Um número inteiro com incremento automático e chave primária.
- `name`: Uma string que não pode ser nula (ou seja, é obrigatória).
- `password`: Uma string para armazenar a senha do usuário.

### Modelo 'Task'

O segundo modelo definido é 'Task', que representa uma tarefa. Ele possui as seguintes colunas:

- `id`: Um número inteiro com incremento automático e chave primária.
- `description`: Uma string para armazenar a descrição da tarefa.
- `done`: Um valor booleano para indicar se a tarefa está concluída.
- `user_id`: Uma referência a um usuário por meio da coluna `id` do modelo 'User'.

## Inicialização e Sincronização

A função `init()` é assíncrona e executa a sincronização dos modelos com o banco de dados usando `sequelize.sync({ force: true })`. Isso cria as tabelas correspondentes aos modelos. Um usuário de exemplo é criado com o nome 'teste' e senha 'teste123' usando `User.create()`.

# Arquivo login.js - Explicação

Este arquivo contém um módulo responsável por lidar com o processo de autenticação de um usuário e a geração de um token de acesso usando a biblioteca `jsonwebtoken`. O objetivo é validar as credenciais do usuário e fornecer um token para acesso autenticado.

## Variáveis de Ambiente

As variáveis de ambiente `JWT_SECRET` e `JWT_ALGORITHM` são carregadas a partir do arquivo `.env` usando `process.env`. Elas representam a chave secreta usada para assinar o token e o algoritmo de criptografia usado na geração do token, respectivamente.

O fluxo do código é o seguinte:

1. O código chama a função `readUserByName()` para buscar informações do usuário com base no nome fornecido na solicitação.

2. Se nenhum usuário for encontrado ou se a senha fornecida na solicitação não coincidir com a senha armazenada no banco de dados, uma resposta de erro com status 403 (Acesso Proibido) é enviada de volta ao cliente, indicando que o login é inválido.

3. Se o usuário for encontrado e as credenciais estiverem corretas, a senha do objeto `user` é excluída para evitar o envio dela de volta como resposta.

4. Um token de acesso é gerado usando `jwt.sign()`, que recebe o nome do usuário, a chave secreta e o algoritmo como argumentos. O token gerado é incluído em uma resposta JSON enviada de volta ao cliente.

## Uso

Este módulo é projetado para ser chamado em uma rota que lida com a autenticação do usuário. O nome de usuário e senha são fornecidos na solicitação e o módulo executa a autenticação, retornando um token de acesso em caso de sucesso.

