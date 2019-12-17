'use strict'
import authEventHandler from './auth/events'
import { showMain, showSignIn } from './auth/ui'
if(document.cookie) {
  authEventHandler.storeToken()
  showMain()
} else {
  showSignIn()
}
$(() => {
  
})



















