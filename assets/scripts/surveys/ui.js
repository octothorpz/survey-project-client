'use strict'

const store = require('../store')
// const showSurveysTemplate = require('../templates/survey.handlebars')
const takeSurveysTemplate = require('../templates/take-surveys.handlebars')

$('#create-survey-button').on('click', function () {
  $('#create-survey').show()
  $('#show-surveys-area').hide()
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Create a survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
})

$('#take-surveys-button').on('click', function () {
  $('#create-survey-form').trigger('reset')
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Take a survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
})

$('#back-button').on('click', function () {
  $('#create-survey-form').trigger('reset')
  $('#create-survey').hide()
})

const onCreateSurveyFailure = function () {
  console.log('oh no! Failed to sign up!')
  $('#create-survey-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to create survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}
// const onGetSurveysSuccess = function (response) {
//   store.surveys = response.surveys
//   $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
//   Here are the surveys!</div>`)
//   window.setTimeout(function () {
//     $('.alert').fadeTo(500, 0).slideUp(500, function () {
//       $(this).remove()
//     })
//   }, 3000)
//   const showSurveysHtml = showSurveysTemplate({ surveys: response.surveys })
//   $('#show-surveys-area').html(showSurveysHtml)
// }
//
// const onGetSurveysFailure = function () {
//   console.log('Something went wrong.')
// }

const onTakeSurveysSuccess = function (response) {
  $('#show-surveys-area').show()
  $('#create-survey').hide()
  $('.update-model').modal('hide')
  store.surveys = response.surveys
  // $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  // Take a survey!</div>`)
  // window.setTimeout(function () {
  //   $('.alert').fadeTo(500, 0).slideUp(500, function () {
  //     $(this).remove()
  //   })
  // }, 3000)
  const takeSurveysHtml = takeSurveysTemplate({ surveys: response.surveys })
  $('#show-surveys-area').html(takeSurveysHtml)
  // Hide the edit and delete buttons for surveys not owned by the current user
  $('.edit-survey-button, .delete-survey-button').filter((index, button) => {
    // note: not using index, but need it since button is passed as second parameter
    const surveyOwner = button.getAttribute('data-owner')
    // keep only ones where the survey owner is not the current user,
    // so that we can hide them
    return surveyOwner !== store.user._id
  }).hide()
  $('input[type=radio]').filter((index, radio) => {
    return !radio.value
  }).parents('.form-check').hide()
  // $('input[type="radio"]').each(() => {
  //   if ($(this).val() === '') {
  //     console.log($(this).parent())
  //   }
  // })
  $('.modal-backdrop').remove()
  $('body').removeClass('modal-open')
}

const onTakeSurveysFailure = function () {
  console.log('oh no! Failed to sign up!')
  $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to create survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}

const onUpdateSurveySuccess = function (response) {
  $('.update-modal').modal('hide')
  $('.modal-backdrop').remove()
  console.log('we got here')
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  You updated your survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
  // loop through the surveys in store
  for (let i = 0; i < store.surveys.length; i++) {
  // temporarily put the survey you're looking at in a variable survey
    const survey = store.surveys[i]
    // if that survey's ID matches the survey ID of the response
    if (survey.id === response.survey.id) {
      // if above is true, replace the existing survey with the updated version
      store.surveys[i] = response.survey
      break
    }
  }
}

const onUpdateSurveyFailure = function () {
  console.log('oh no! Failed to sign up!')
  $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to update survey</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}

const onSubmitAnswerSuccess = function (response) {
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Answer submitted!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}

const onSubmitAnswerFailure = function (response) {
  try {
    const responseObject = JSON.parse(response.responseText)
    let reason
    if (responseObject.errors) {
      reason = responseObject.errors
    } else {
      reason = 'an unknown error occurred'
    }
    $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
        Your response could not be submitted: ${reason}</div>`)
    window.setTimeout(function () {
      $('.alert').fadeTo(500, 0).slideUp(500, function () {
        $(this).remove()
      })
    }, 3000)
  } catch (e) {
    $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
    Your response could not be submitted: ${response.responseText}</div>`)
    window.setTimeout(function () {
      $('.alert').fadeTo(500, 0).slideUp(500, function () {
        $(this).remove()
      })
    }, 3000)
  }
}

const onDeleteSurveyFailure = function () {
  $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to delete survey</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}

const onViewSurveyResultsSuccess = stats => {
  let table = ''
  for (const choice in stats) {
    table += `${choice}: ${Math.floor((stats[choice] * 100))}%<br>`
  }
  $('#survey-result-display').html('<h2>Survey results:</h2>' + table)
}

const onViewSurveyResultsFailure = function () {
  $('#user-message').html(`<div class="alert alert-danger fade show" role="alert">
  Failed to delete survey</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}

module.exports = {
  onCreateSurveyFailure,
  // onGetSurveysSuccess,
  // onGetSurveysFailure,
  onUpdateSurveySuccess,
  onUpdateSurveyFailure,
  onTakeSurveysSuccess,
  onTakeSurveysFailure,
  onSubmitAnswerSuccess,
  onSubmitAnswerFailure,
  onDeleteSurveyFailure,
  onViewSurveyResultsSuccess,
  onViewSurveyResultsFailure
}
