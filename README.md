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
docker tag python-img hallzero/intelli:0.0.1
docker push hallzero/teste-aula:0.0.1
```