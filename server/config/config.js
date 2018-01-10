module.exports = {
  'development': {
    'username': 'postgres',
    'password': '123456',
    'database': 'voting_schema',
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'define': {
      'underscored': true
    }
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'production': {
    'username': process.env['username'],
    'password': process.env['password'],
    'database': process.env['db_name'],
    'host': process.env['host'],
    'dialect': 'postgres'
  }
}
