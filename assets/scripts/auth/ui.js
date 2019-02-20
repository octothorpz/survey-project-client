'use strict'

const store = require('../store')
$('#change-password').on('click', function () {
  $('#create-survey-form').trigger('reset')
})

const onSignUpSuccess = function (responseData) {
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Successfully signed up as ${responseData.user.email}!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#signupModalCenter').modal('hide')
}
const onSignUpFailure = function () {
  console.log('oh no! Failed to sign up!')
}
const onSignInSuccess = function (responseData) {
  store.user = responseData.user
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Successfully signed in as ${responseData.user.email}!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#signinModalCenter').modal('hide')
  $('#take-surveys-button, #show-surveys-button, #create-survey-button, #dropdownMenu, #change-password, #sign-out-button').show()
  $('#sign-in, #sign-up').hide()
}

const onSignInFailure = function () {
  console.log('oh no! Failed to sign IN!')
}

const onChangePasswordSuccess = function () {
  $('#passwordModalCenter').modal('hide')
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Successfully changed password!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}
const onChangePasswordFailure = function () {
  console.log('oh no! Failed to Change password!')
}
const onSignOutSuccess = function () {
  store.user = null
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Successfully signed out!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#user-message').css('color', 'green')
  $('#create-survey-button, #take-surveys-button, #show-surveys-button, #show-surveys-area, #create-survey').hide()
  $('#dropdownMenu').hide()
  $('#sign-out-button').hide()
  $('#sign-in, #sign-up').show()
  $('#create-survey-form').trigger('reset')
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
