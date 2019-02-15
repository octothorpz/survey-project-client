'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onSignUp = function (event) {
  event.preventDefault()
  console.log('Event click worked!')
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  console.log('Event click worked!')
  const formData = getFormFields(event.target)
  console.log(formData)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onChangePassword = function (event) {
  event.preventDefault()
  console.log('Event click worked!')
  const formData = getFormFields(event.target)
  console.log(formData)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  console.log('Event click worked!')
  const formData = getFormFields(event.target)
  api.signOut(formData)
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const addHandlers = () => {
  // user sign up
  $('#signupModalCenter').on('hidden.bs.modal', function () {
    $('#sign-up-form').trigger('reset')
  })
  $('#sign-up-form').on('submit', onSignUp)
  // user sign in
  $('#signinModalCenter').on('hidden.bs.modal', function () {
    $('#sign-in-form').trigger('reset')
  })
  $('#sign-in-form').on('submit', onSignIn)
  // user change password
  $('#passwordModalCenter').on('hidden.bs.modal', function () {
    $('#change-password-form').trigger('reset')
  })
  $('#change-password-form').on('submit', onChangePassword)
  $('#sign-out-button').on('click', onSignOut)
}
module.exports = {
  addHandlers
}
