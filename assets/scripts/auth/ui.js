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
  $('#sign-up-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to sign up!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#sign-up-form').trigger('reset')
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
  $('#sign-in, #sign-up, #entry-buttons').hide()
}

const onSignInFailure = function () {
  $('#sign-in-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to sign in!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#sign-in-form').trigger('reset')
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
  $('#change-password-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to change password!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  $('#change-password-form').trigger('reset')
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
  $('#create-survey-button, #take-surveys-button, #show-surveys-button, #show-surveys-area, #create-survey, #survey-result-display').hide()
  $('#dropdownMenu').hide()
  $('#sign-out-button').hide()
  $('#sign-in, #sign-up, #entry-buttons').show()
  $('#create-survey-form').trigger('reset')
}

const onSignOutFailure = function () {
  $('#sign-out-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to sign out!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
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
