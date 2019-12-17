'use strict'
// import authEventHandler from './auth/events'
// import { showMain, showSignIn } from './auth/ui'
import { requestModels } from './mvc/build'
import { store } from './store'

$(() => {
  requestModels('invoices')
  console.log(store)
})



















