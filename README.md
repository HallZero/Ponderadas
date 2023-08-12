# Ponderadas
Contains proposed solutions for the evaluated exercises

docker build -t python-img .
docker run -p 3000:80 --name fastapi-server python-img

docker login
docker tag python-img hallzero/intelli:0.0.1
docker push hallzero/teste-aula:0.0.1