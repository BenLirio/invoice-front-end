'use strict'
import { requestModels } from './mvc/build'
import { store } from './store'

$(() => {
  requestModels('invoices').then(console.log)
  $('.btn-primary').on('click',event => {
    event.preventDefault()
    console.log(store.models.invoices[16]._items)
  })
})






















// const userController = require('./controllers/UserController')

    // console.log(userController.invoices.find(1).items())
    // console.log(JSON.parse(JSON.stringify(userController)))
    // console.log(userController)
    // console.log(userController.invoices.find(1).items())
    // console.log('the invoice', userController.invoices.find(1))
    // console.log('the items of the invoice', userController.invoices.all()[0].items)
    // console.log('all items', userController.invoices.all()[0].items.all())