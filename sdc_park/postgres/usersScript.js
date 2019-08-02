const faker = require('faker')
const { appendFileSync } = require('fs')

const inputRow = (start, end) => {
  let csvStr = ''
  for (let i = start; i < end; i++) {
    csvStr += `\n${i},${faker.name.findName()},${'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg'}`
  }
  return csvStr
}

const appendCSV = (m) => {
  for (let i = 0; i < m; i++) {
    users = inputRow(i * 10000, i * 10000 + 10000)
    appendFileSync(__dirname + '/users.csv', users)
  }
}

appendCSV(1)