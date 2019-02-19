'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const createSuccess = function () {
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Successfully created survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}
const deleteSuccess = function () {
  $('#user-message').html(`<div class="alert alert-success fade show" role="alert">
  Deleted survey!</div>`)
  window.setTimeout(function () {
    $('.alert').fadeTo(500, 0).slideUp(500, function () {
      $(this).remove()
    })
  }, 3000)
}
const onCreateSurvey = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  formData.results = [0, 0, 0, 0, 0]
  api.createSurvey(formData)
    .then(() => onGetSurveys(event))
    .then(() => createSuccess())
    .catch(ui.onCreateSurveyFailure)
}

const onGetSurveys = function (event) {
  console.log()
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.getSurveys(formData)
    .then(ui.onGetSurveysSuccess)
    .catch(ui.onGetSurveysFailure)
}

const onUpdateSurvey = function (event) {
  event.preventDefault()
  const target = $(event.target).closest('section').data('id')
  console.log(target)
  store.modalId = target
  const formData = getFormFields(event.target)
  // console.log(formData)
  api.updateSurvey(formData, target)
    .then(() => onGetSurveys(event))
    .catch(ui.onUpdateSurveyFailure)
}

const onDeleteSurvey = (event) => {
  event.preventDefault()
  const target = $(event.target).closest('section').data('id')
  console.log(target)
  store.modalId = target
  api.deleteSurvey(target)
    .then(() => onGetSurveys(event))
    .then(() => deleteSuccess())
    .catch(ui.onDeleteSurveyFailure)
}

const onTakeSurveys = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.takeSurveys(formData)
    .then(ui.onTakeSurveysSuccess)
    .catch(ui.onTakeSurveysFailure)
}

const onSubmitAnswer = (event) => {
  event.preventDefault()
  const form = event.target
  const surveyId = $(form).closest('section').data('id')
  // form.elements gives the elements in the form and then .answer accesses the radio button set
  // and then .value gives the value of the selected radio button
  const answer = form.elements.answer.value
  api.submitAnswer(surveyId, answer)
    .then(ui.onSubmitAnswerSuccess)
    .catch(ui.onSubmitAnswerFailure)
}

const onViewSurveyResults = (event) => {
  event.preventDefault()
  const target = $(event.target).closest('section').data('id')
  console.log(target)
  api.getSurveyStats(target)
    .then(ui.onViewSurveyResultsSuccess)
    .catch(ui.onViewSurveyResultsFailure)
}

const addHandlers = () => {
  $('#create-survey-form').on('submit', onCreateSurvey)
  $('#show-surveys-button').on('click', onGetSurveys)
  $('#update-survey-form').on('submit', onUpdateSurvey)
  $('body').on('hide.bs.modal', '.update-modal', function () {
    $('.update-survey-form').trigger('reset')
  })
  $('#show-surveys-area').on('submit', '.update-survey-form', onUpdateSurvey)
  $('body').on('click', '.delete-survey-button', onDeleteSurvey)
  $('#take-surveys-button').on('click', onTakeSurveys)
  $('#show-surveys-area').on('submit', '.take-survey-form', onSubmitAnswer)
  $('body').on('click', '.view-survey-results-button', onViewSurveyResults)
}

module.exports = {
  addHandlers
}
