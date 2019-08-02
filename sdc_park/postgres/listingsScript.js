// write a function that generates my data to import into my csv file

const faker = require('faker')
const { appendFileSync } = require('fs')

// create rows of data 
const inputRow = (start, end) => {
  let csvStr = ''
  for (let i = start; i < end; i++) {
    csvStr += `\n${i},${faker.name.findName()}`
  }
  return csvStr
}

// add rows generated to CSV file
const appendCSV = (m) => {
  for (let i = 0; i < m; i++) {
    listings = inputRow(i * 100000, i * 100000 + 100000)
    appendFileSync(__dirname + '/listings.csv', listings)
  }
}

// invoke in sets of 100,000 due to javascript heap issue
appendCSV(100)
