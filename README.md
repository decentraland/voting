# Voting

## Server 

### Database


- Create a database call `voting_schema` with postgres
- Go to config/config.json, edit `development` object with your username and password
- Install `sequelize-cli` running `npm install sequelize-cli -g`
- Once the server is up and running run: `sequelize db:seed:all` to create test data

### Up and Run the server

```
cd server
npm install
npm run start
```


## Webapp 

### Development

```
cd webapp
npm install
npm run start
```

### Build

```npm run build```
