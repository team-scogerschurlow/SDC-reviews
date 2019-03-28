// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: 'postgres://localhost/reviews',
    migrations: {
      directory: __dirname + `/migrations`
    },
    seeds: {
      directory: __dirname + `/database/sampledata`
    }
  }
}