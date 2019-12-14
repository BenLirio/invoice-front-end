'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const invoiceEvents = require('./invoices/events')
const userController = require('./controllers/UserController')

$(() => {
  setTimeout(() => {
    // console.log(userController.invoices.find(1).items())
    console.log(JSON.parse(JSON.stringify(userController)))
    console.log(userController)
    // console.log(userController.invoices.find(1).items())
    // console.log('the invoice', userController.invoices.find(1))
    // console.log('the items of the invoice', userController.invoices.all()[0].items)
    // console.log('all items', userController.invoices.all()[0].items.all())
  }, 0)
})
