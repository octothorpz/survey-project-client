'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.createSurvey(formData)
    .then(() => onGetSurveys(event))
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
    .then(ui.onUpdateSurveySuccess)
    .catch(ui.onUpdateSurveyFailure)
}

const onDeleteSurvey = (event) => {
  event.preventDefault()
  const target = $(event.target).closest('section').data('id')
  console.log(target)
  store.modalId = target
  api.deleteSurvey(target)
    .then(() => onGetSurveys(event))
    .catch(ui.onDeleteSurveyFailure)
}

const addHandlers = () => {
  $('#create-survey-form').on('submit', onCreateSurvey)
  $('#show-surveys-button').on('click', onGetSurveys)
  $('#update-survey-form').on('submit', onUpdateSurvey)
  $('body').on('hide.bs.modal', '.update-modal', function () {
    $('.update-survey-form').trigger('reset')
  })
  $('#show-surveys-area').on('submit', '.update-survey-form', onUpdateSurvey)
  $('body').on('click', '#delete-survey-button', onDeleteSurvey)
}
module.exports = {
  addHandlers
}
