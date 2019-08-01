const faker = require('faker')
const { appendFileSync } = require('fs')

const inputRow = (start, end) => {
  let csvStr = ''
  for (let i = start; i < end; i++) {
    csvStr += `\n${i},${faker.random.number()},${faker.random.number()},${faker.date.past(1)},${faker.lorem.paragraph()},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})},${faker.random.number({min:0, max:1, precision:0.1})}`
  }
  return csvStr
}

const appendCSV = (m) => {
  for (let i = 0; i < m; i++) {
    reviewsgiven = inputRow(i * 10, i * 10 + 10)
    appendFileSync(__dirname + '/reviewsgiven.csv', reviewsgiven)
  }
}

appendCSV(10)