# Meu Front

Projeto MVP para a Disciplina **Desenvolvimento Full Stack Avançado** 

Este projeto é uma aplicação frontend desenvolvida em HTML, CSS e JavaScript.
O objetivo é criar uma interface para que os usuários possam compartilhar listas de compras entre si.
É permitido criar novas listas, adicionar, alterar e excluir produtos.

---
## Pré Requisitos

Para que a aplicação funcione, é preciso que a api_slc esteja em execução.

---
## API Externa

A aplicação possui acesso a duas apis externas.
Uma para trazer a cotação do dólar atual e outra para exibir a cotação do euro.

links para acesso das APIs externas:
Dólar: https://economia.awesomeapi.com.br/json/last/USD-BRL
EURO: https://economia.awesomeapi.com.br/json/last/EUR-BRL

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

---
## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue no terminal até o diretório que contém o Dockerfile.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
docker build -t front_slc .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
docker run -p 8080:80 front_slc
```

Uma vez executado, para acessar a API, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.
