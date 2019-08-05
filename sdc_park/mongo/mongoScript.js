// write a function that generates my data to import into my csv file
const faker = require('faker')
const { appendFileSync } = require('fs')

// function to add array of review objects
const reviewsArray = () => {
  let addReview = ''
  for (let i = 1; i <= 10; i++) {
    addReview += `${Date.now()},${faker.lorem.paragraph()},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})},${faker.random.number({max: 5})}`
  }
  return addReview
}

// create rows of data 
const inputRow = (start, end) => {
  let csvStr = ''
  for (let i = start; i < end; i++) {
    csvStr += `\n${i},${faker.name.findName()},${reviewsArray()}`
  }
  return csvStr
}

// add rows generated to CSV file
const appendCSV = (m) => {
  for (let i = 0; i < m; i++) {
    listings = inputRow(i * 10000, i * 10000 + 10000)
    appendFileSync(__dirname + '/mongolistings.csv', listings)
  }
}

// invoke in sets of 10,000 due to javascript heap issue
appendCSV(1000)
