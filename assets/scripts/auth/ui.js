'use strict'

const store = require('../store')

const onSignUpSuccess = function () {
  console.log('UI onSignUpSuccess worked!')
  $('#signupModalCenter').modal('hide')
}
const onSignUpFailure = function () {
  console.log('oh no! Failed to sign up!')
}
const onSignInSuccess = function (responseData) {
  store.user = responseData.user
  console.log(store.user.email)
  $('#signinModalCenter').modal('hide')
  $('#change-password, #take-surveys-button, #sign-out-button, #show-surveys-button, #create-survey-button').show()
  $('#sign-in, #sign-up').hide()
}

const onSignInFailure = function () {
  console.log('oh no! Failed to sign IN!')
}

const onChangePasswordSuccess = function () {
  console.log('UI onChangePasswordSuccess worked!')
  $('#passwordModalCenter').modal('hide')
}
const onChangePasswordFailure = function () {
  console.log('oh no! Failed to Change password!')
}
const onSignOutSuccess = function () {
  store.user = null
  console.log('SignOUT Success!')
  $('#create-survey').hide()
  $('#change-password').hide()
  $('#sign-out-button').hide()
}
const onSignOutFailure = function () {
  console.log('oh no! Failed to sign OUT!')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
