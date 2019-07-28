// write a function that generates my data to import into my csv file
// https://nodejs.org/api/fs.html#fs_fs_appendfilesync_path_data_options

const faker = require('faker')
const { appendFileSync } = require('fs')

const inputRow = (n) => {
  let csvStr = ''
  for (let i = 0; i < n; i++) {
    csvStr += `\n${faker.name.findName()}`
  }
  console.log(csvStr)
  return csvStr
  // console.log(faker.name.findName())
}

const appendCSV = (m) => {
  for (let i = 0; i < m; i++ ) {
    listings = inputRow(100000)
    // console.log(listings)
    appendFileSync('listings.csv', listings)
  }
}

console.log(appendCSV(100));

