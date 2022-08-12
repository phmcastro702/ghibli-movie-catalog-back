
# Ghibli Movie Catalog (Back-end)

Backend de suporte para website de visualização de catálogo de filmes do Studio Ghibli.


## Stack utilizada

**Node, Express, Sequelize, MySQL e Heroku**


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/phmcastro702/ghibli-movie-catalog-back.git
```

Entre no diretório do projeto

```bash
  cd ghibli-movie-catalog-back
```

Instale as dependências

```bash
  npm install
```

**!! Antes de rodar certifique-se que está rodando um servidor MySQL local 
e que configurou as variáveis de ambiente informadas na próxima seção !!**


Inicie o servidor

```bash
  npm run start
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

O arquivo .env.local tem um 'esqueleto' do formato esperado para o .env, para agilizar você pode
copiar este aquivo, renomeá-lo para .env e completar as variáveis

`PORT`: Porta para rodar o servidor

`APP_FRONTEND_URL`: URL do frontend(utilizada pelo CORs para permitir o acesso ao backend) que se comunicará com backend. (Valor Default está no .env.local)

`DB_NAME`: Nome do banco de dados MySQL.

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`




## Ou acesse o projeto 'vivo' (foi feito o deploy)

Realizei o deploy com o Heroku e o projeto está 'vivo' na URL: 

https://api-helper-ghibli-movies.herokuapp.com/

Para rápida demonstração, aqui está a URL do app frontend que consome este backend: 

https://ghibli-movies-catalog-mu.vercel.app/



Lembrando que pode demorar um pouco o acesso por conta do tempo que o Heroku leva para iniciar o 
processo Node que pode ter adormecido.
