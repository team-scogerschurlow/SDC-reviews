const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'me',
  host: 'localhost',
  database: 'reviews',
  // password: 'password',
  port: 5432,
})

const getReviewsById = (request, response) => {
  const id = parseInt(request.params.id)
  console.log(request.params.id)
  pool.query('SELECT * FROM reviewsgiven WHERE listing_id = $1', [id], (error, results) => {
    if (error) {
      console.log(error + ' this is your error dummy')
    }
    response.status(200).json(results)
  })
}

module.exports = {
  getReviewsById
}