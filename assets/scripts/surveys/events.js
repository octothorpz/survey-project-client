'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData.results)
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

const onTakeSurveys = function (event) {
  console.log()
  event.preventDefault()
  const formData = getFormFields(event.target)
  console.log(formData)
  api.takeSurveys(formData)
    .then(ui.onTakeSurveysSuccess)
    .catch(ui.onTakeSurveysFailure)
}

const onSubmitAnswer = function (event) {
  const numberOfChoices = []
  console.log('click worked!')
  event.preventDefault()
  const target = $(event.target).closest('section').data('id')
  const formData = getFormFields(event.target)
  console.log(formData)
  let surveyChoice = null
  const checkResponse = function () {
    if ($(`input[id=response1-${target}]:checked`).val() !== undefined) {
      surveyChoice = [1, 0, 0, 0, 0]
      numberOfChoices.push(1)
    }
    if ($(`input[id=response2-${target}]:checked`).val() !== undefined) {
      surveyChoice = [0, 1, 0, 0, 0]
      numberOfChoices.push(1)
    }
    if ($(`input[id=response3-${target}]:checked`).val() !== undefined) {
      surveyChoice = [0, 0, 1, 0, 0]
      numberOfChoices.push(1)
    }
    if ($(`input[id=response4-${target}]:checked`).val() !== undefined) {
      surveyChoice = [0, 0, 0, 1, 0]
      numberOfChoices.push(1)
    }
    if ($(`input[id=response5-${target}]:checked`).val() !== undefined) {
      surveyChoice = [0, 0, 0, 0, 1]
      numberOfChoices.push(1)
    }
  }
  formData.results = surveyChoice
  checkResponse()
  console.log(formData)
  if (numberOfChoices.length < 2) {
    api.submitAnswer(formData, target)
      .then(ui.onSubmitAnswerSuccess)
      .catch(ui.onSubmitAnswerFailure)
  } else console.log('Only one selection please!')
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
  $('#take-surveys-button').on('click', onTakeSurveys)
  $('body').on('click', '#submit-response-button', onSubmitAnswer)
}

module.exports = {
  addHandlers
}
