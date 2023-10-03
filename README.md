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

# Ponderada 4

```
.
└── ponderada4/
    ├── config/
    │   └── database.js
    ├── machine-learning/
    │   ├── finalized_model.pkl
    │   ├── machine-learning.ipynb
    │   ├── Dockerfile
    │   └── requirements.txt
    ├── media/
    │   └── Screencast from 02-10-2023 23:49:03.webm
    ├── models/
    │   ├── task.js
    │   └── user.js
    ├── node_modules
    ├── public/
    │   ├── charts.html
    │   ├── login.html
    │   └── todo.html
    ├── routes/
    │   ├── login.js
    │   └── newTask.js
    ├── .env
    ├── app.js
    ├── docker-compose.yaml
    ├── Dockerfile
    ├── package-lock.json
    └── package.json
```

# Ponderada 5 - Resenha sobre o artigo
A partir da leitura do Artigo "Machine learning for internet of things data analysis: a survey", podemos traçar comparativos entre os conceitos nele apresentados, as atividades ponderadas e o projeto desenvolvido durante o módulo. Nesse contexto, podemos evidenciar tópicos:

## IoT, Smart Data e Dados

Segundo o artigo, o propósito da Internet of Things (IoT) é desenvolver ambientes inteligentes e simplificar o estilo de vida ao poupar tempo, energia e dinheiro, conscintindo em dispositivos conectados uns aos outros para aprimorar suas performaces. Dessa forma, o processo de coletar dados através de sensores, extrair informações a partir deles e, por fim transferir esse conhecimento para outros objetos, dispoitivos e servidores é fundamental. Nesse contexto, um cenário especificado é a aplicação dessas tecnologias para a redução de custos dentro de uma empresa, que relaciona-se diretamente com o projeto do módulo. Além disso, há a explicação de protocolos de comunicação (D2D, D2S, S2S), que correspondem a uma parte do transporte dos dados, e o destaque do processamento e preparação dos dados (Analytics at the edge, stream analisys, IoT analysis at the database) para reforçar as diferentes necessidades de um projeto. No nosso caso em particular, é importante destacar o Cloud Computing, que embora não seja a maneira primária de computação do treinamento dos modelos, pode ser uma alternativa.

Smart Data: Por ser de extrema importância para gerar bons insights, a qualidade dos dados deve ser garantida. Devido ao grande volume de dados brutos não necessariamente úteis ou preparados para análise, deve-se construir uma camada de abstração a mais (feature engeneering), bem como garantir a segurança dos dados (JWT, por exemplo) para torná-los mais inteligentes.

## Smart city
O artigo exemplifica diversos conceitos e vantagens do uso do IoT a partir de cidades inteligentes. Embora não seja diretamente relacionado, podemos traçar alguns paralelos com o projeto desenvolvido:

- Smart Energy: Reduzir o consume de energia geral através da medição de sensores. (Consequência direta)
- Smart Mobility: Efeitos diversos na forma de rodar veículos, principalmente ao monitorar sua performance. (Objetivo principal)
- Urban Planning: Ajudar em decisões de longo-prazo. Ao coletar dados de diferentes fontes, é possível fazer decisões para o futuro e  predições para problemas potenciais. (Consequência direta)
- Smart city data characteristhics: Gera dados de maneira contínua e volumosa. Processar os dados com diferentes fontes, frequências e intregá-los conscistentemente e com qualidade pode ser desafiador. (Característica dos dados disponibilizados)
- Quality of Information (QoI): Necessidade de extrair níveis mais altos de abstração e prover informações acionávies para outros serviços. Selecionar fontes confiáveis e combina-los é de suma importância. (Processo)

## Taxonomia dos algoritmos de machine learning
Devido à geração massiva de dados por diferentes fontes, é importante garantir a manuseabilidade de suas características a fim de garantir que algoritmos de machine learning sejam aplicados no escopo de smart data em projetos IoT. Em ambos projeto e atividades ponderadas, modelos de machine learning estavam presentes e a utilização pontual dependia diretamente da finalidade e característica dos dados. As abordagens foram majoritariamente para aprendizado supervisionado e explorou-se diversas opções de modelos e ferramentas.

Nesse contexto, trabalhamos com abordagens de séries temporais, aplicando conceitos. Não necessariamente todos os testes deram certo, mas constituiram experiências interessantes. A seguir, destaco alguns dos conceitos mais importantes:

- Regressão Linear: Utilizado na predição de visualizações de um canal nas atividades ponderadas. 
- Exponential Smoothing: Método que utiliza séries temporais, aplicando pesos maiores à dados mais recentes. Ideal para forecast de valores imediatos.
- Sliding-window method: Citado no artigo na sessão de séries temporais, é um dos principais componentes das análises do grupo. Consciste na aplicação de uma janela de tempo para determinar o comportamento de uma falha.

- Pycaret: Ferramenta que possibilitou a aplicação de todo o ciclo da criação de um modelo rapidamente.
- Prophet: Framework open-source do Facebook, é uma das ferramentas utilizadas para de realizar previsões em séries temporais. 

## Conclusões
O artigo conclui que para extrair conhecimento dos dados coletados, vários algorítmos podem ser aplicados. Escolher um algoritmo adequado para aplicações IoT específicas é um tópico importante, sendo que diferentes aplicações possuem diferentes características, com dados com propriedades distintas a serem consideradas e a taxonomia é outro faotr importante na aplicação de análise de dados pata smart data.

Da mesma forma, é possível obter essas noções no escopo prático do projeto, uma vez que o contexto é objetivamente parecido e os processos que levam à construção da aplicação final são constituídos pela utilização dos pontos evidenciados. Inclusivamente, as atividades ponderadas, embora num contexto mais simples, também apresentam um nível de complexidade que exige os conhecimentos apresentados no artigo.
