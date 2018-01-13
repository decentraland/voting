module.exports = {
  'development': {
    'username': 'postgres',
    'password': '',
    'database': 'postgres',
    'host': 'postgres',
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
