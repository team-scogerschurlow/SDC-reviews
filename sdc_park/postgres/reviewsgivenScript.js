const faker = require('faker')
const { appendFileSync } = require('fs')

const inputRow = (start, end) => {
  let csvStr = ''
  for (let i = start; i < end; i++) {
    csvStr += `\n${i},${faker.random.number({max: 9999})},${faker.random.number({max: 9999999})},${faker.date.past()},${faker.lorem.paragraph()},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})}`
  }
  return csvStr
}

const appendCSV = (m) => {
  for (let i = 0; i < m; i++) {
    reviewsgiven = inputRow(i * 100000, i * 100000 + 100000)
    appendFileSync(__dirname + '/reviewsgiven.csv', reviewsgiven)
  }
}

appendCSV(1000)