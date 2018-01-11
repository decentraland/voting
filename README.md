# Voting

## API description

|route|method|description|
|---|---|---|
|**/{subject}**|GET|Query a subject|
|**/{subject}/list**|GET|Query all current active subjects|
|**/{subject}**|GET|Query all the votes for a subject|
|**/{subject}/votes**|GET|Query all the votes for a subject|
|**/{subject}**|GET|Query all the votes for a subject|
|**/{subject}/votes**|POST|Create or update a vote|

### Votes
Sample of body payload:
```
{
  'id': 'e728dfa3-974a-43f5-aaf7-b67135c70d27',
  'image': 'type sample',
  'title': 'no',
  'description': 'some description',
  'address_count': 0,
  'votes_weight': 0,
  'yes_weight': 0,
  'abstentions_weight': 0,
  'no_weight': 0,
  'yes_count': 0,
  'abstentions_count': 0,
  'no_count': 0
}
```

# Development 

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
