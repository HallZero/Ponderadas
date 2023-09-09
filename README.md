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

# 3. Ponderada 3

Este projeto tem como objetivo a produção de um modelo preditivo e uma API que, a partir dos dados passados, consiga prever um valor.

## Estrutura de Pastas:

Todo o processo de Limpeza de dados e treinamento está contido em 'machine-learning.ipynb', de onde é gerado o modelo propriamente dito em um arquivo .pkl 'finalized_model.pkl'.

```
└── ponderada3/
    └── src/
        ├── dataset/
        │   └── Global YouTube Statistics.csv
        ├── machine-learning/
        │   ├── finalized_model.pkl
        │   └── machine-learning.ipynb
        ├── app.py
        ├── Dockerfile
        └── requirements.txt
```

## Dataset utilizado: Global Youtube Statistics
O dataset pode ser encontrado em: https://www.kaggle.com/datasets/nelgiriyewithana/global-youtube-statistics-2023

## Machine Learning Algorithm: Linear Regression

A regressão linear é um dos modelos de aprendizado de máquina mais simples e interpretáveis. É fácil de entender e implementar, o que o torna uma excelente escolha para nós. (Até porque odeio análise de dados e não quero ir além disso... Desculpa Murilo 😅)

No contexto de prever visualizações de vídeos no YouTube, isso significa encontrar uma equação que descreve como os atributos dos vídeos (os dados usados para a predição) se relacionam com o número de visualizações. É uma técnica simples e interpretável que pode ajudar a entender e otimizar o desempenho dos vídeos.

## API: FastAPI

A API possui apenas duas rotas:
- GET ('/') -> Retorna um Hello World simples
- POST ('/predict') -> A partir dos dados passados para o modelo, retorna uma predição do video_views do canal em questão

### Para rodar o projeto:

1. Baixe a imagem do repositório hallzero/predict [aqui!](https://hub.docker.com/repository/docker/hallzero/prediction/general)
2. Rode o comando no terminal:
```
docker run -p 8000:8000 --name nome_exemplo hallzero/predict:0.0.1
```
3. O FastAPI gera uma documentação automática em ('/docs'). Na aba explicando o ('/predict'), utilize o template de input para fazer a predição, que será devolvida como a respota à requisição.

Pontos de melhoria observados:
- Preciso aprender melhor a lidar com dados categóricos
- Aprender a modularizar o processo de limpeza dos dados, a fim de não depender de rodar o notebook ou colocar o mesmo código na API