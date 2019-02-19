'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onCreateSurvey = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  formData.results = [0, 0, 0, 0, 0]
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

const onSubmitAnswerOld = function (event) {
  const numberOfChoices = []
  // console.log('click worked!')
  event.preventDefault()
  console.log(event.target)
  const target = $(event.target).closest('section').data('id')
  const formData = getFormFields(event.target)
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
  checkResponse()
  // delete formData.survey
  formData.survey.title = ''
  formData.survey.option1 = ''
  formData.survey.option2 = ''
  formData.survey.option3 = ''
  formData.survey.option4 = ''
  formData.survey.option5 = ''
  formData.survey.results = ''
  formData.survey.results = surveyChoice
  console.log(formData)
  if (numberOfChoices.length < 2) {
    api.submitAnswer(formData, target)
      .then(ui.onSubmitAnswerSuccess)
      .catch(ui.onSubmitAnswerFailure)
  } else console.log('Only one selection please!')
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
