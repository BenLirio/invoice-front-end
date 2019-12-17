const getFromFields = require('../../../lib/get-form-fields')
import { signIn, signUp } from './api'
import { store } from '../store'
import { showMain, showSignIn } from './ui'
import { requestModels } from '../mvc/build'
import { request } from 'http'
import { apiUrl } from '../config'
const EventHandler = function() {
  this.listenToSignUp()
  this.listenToSignIn()
  this.listenToSignOut()
}


EventHandler.prototype.listenToSignUp = function() {
  $('#sign-up-form').on('submit', event => this.onSignUp(event))
}
EventHandler.prototype.listenToSignIn = function() {
  $('#sign-in-form').on('submit', event => this.onSignIn(event))
}
EventHandler.prototype.listenToSignOut = function() {
  $('#sign-out').on('click', this.onSignOut)
}

EventHandler.prototype.onSignUp = function(event) {
  const data = initData(event)
  signUp(data).then(() => this.onSignIn(event))
}
EventHandler.prototype.onSignOut = function() {
  document.cookie = ''
  store.user = ''
  showSignIn()
}
EventHandler.prototype.onSignIn = function(event) {
  const data = initData(event)
  signIn(data)
    .then(res => {
      document.cookie = res.user.token
      this.storeToken(res.user)
      showMain()
    })
}

EventHandler.prototype.storeToken = function (user) {
  store.user = user
  store.user.token = document.cookie
  
  // $.ajax({
  //   url: apiUrl + '/worlds',
  //   method: 'POST',
  //   headers: {
  //     "Authorization": `Token token=${document.cookie}`
  //   },
  //   data: {
  //     world: {
  //       name: 'hello'
  //     }
  //   }
  // }).then(res=> {
  //   
  // })
  
}


const initData = function(event) {
  event.preventDefault()
  const form = event.target
  const data = getFromFields(form)
  return data
}

export default new EventHandler()