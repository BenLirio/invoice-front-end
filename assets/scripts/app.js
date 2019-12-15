'use strict'
import { build } from './models/ModelBuilder'
const init = async function() {
  const data = await $.ajax({url:'http://localhost:4741/invoices'})

  return data
}
init()
.then(res => {
  build(res)
})


$(() => {

})






















// const userController = require('./controllers/UserController')

    // console.log(userController.invoices.find(1).items())
    // console.log(JSON.parse(JSON.stringify(userController)))
    // console.log(userController)
    // console.log(userController.invoices.find(1).items())
    // console.log('the invoice', userController.invoices.find(1))
    // console.log('the items of the invoice', userController.invoices.all()[0].items)
    // console.log('all items', userController.invoices.all()[0].items.all())