const mongoose = require('mongoose')

const listingsSchema = new mongoose.Schema ({
  id: Number,
  listing_name: String,
  reviews: Array
})

const listings = mongoose.model('listings', listingsSchema)

module.exports = listings
