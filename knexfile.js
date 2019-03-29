module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'reviews'
    },
    migrations: {
      directory: __dirname + `/migrations`
    },
    seeds: {
      directory: __dirname + `/seeds`
    }
  }
}