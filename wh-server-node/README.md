
# Furniture Challenge Api

Challenge Node.js

## Requisites

Docker and Docker compose intelled on your computer

    
## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd wh-server-node
```

Start database and services 

```bash
  docker-compose up -d db
```

Run migration docker compose service (see below)

Run the app server

```bash
  docker-compose up app
```

Start the server with npm

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`NODE_ENV`

`HOSTNAME`

`GOOGLE_API_KEY`

`PORT`

`JWT_SECRET`

`MYSQL_DATABASE_HOST`

`MYSQL_DATABASE_NAME`

`MYSQL_DATABASE_USER`

`MYSQL_DATABASE_PASSWORD`

## Migration

to create a new migration:
```bash
docker-compose up migration

```

to execute the migrations
```bash
./node_modules/typeorm/cli.js migration:run

```

## Authors

- [@JuanAndrésCarmena](https://www.linkedin.com/jcarmena)
