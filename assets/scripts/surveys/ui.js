'use strict'

const store = require('../store')
const showSurveysTemplate = require('../templates/survey.handlebars')
const takeSurveysTemplate = require('../templates/take-surveys.handlebars')

const onCreateSurveySuccess = function (formData) {
  console.log(formData)
}

const onCreateSurveyFailure = function () {
  console.log('Something went wrong.')
}
const onGetSurveysSuccess = function (response) {
  store.surveys = response.surveys
  console.log(response.surveys)
  const showSurveysHtml = showSurveysTemplate({ surveys: response.surveys })
  $('#show-surveys-area').html(showSurveysHtml)
}

const onGetSurveysFailure = function () {
  console.log('Something went wrong.')
}

const onTakeSurveysSuccess = function (response) {
  store.surveys = response.surveys
  console.log(response.survey)
  const takeSurveysHtml = takeSurveysTemplate({ surveys: response.surveys })
  $('#show-surveys-area').html(takeSurveysHtml)
}

const onTakeSurveysFailure = function () {
  console.log('Something went wrong.')
}

const onUpdateSurveySuccess = function (response) {
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
  // store.surveys = response.surveys
  // console.log(response.surveys)
  $('.update-modal').modal('hide')
  // const showSurveysHtml = showSurveysTemplate({ surveys: response.surveys })
  // $('#show-surveys-area').html(showSurveysHtml)
  $('.modal-backdrop').remove()
}

const onUpdateSurveyFailure = function () {
  console.log('Something went wrong.')
}

const onSubmitAnswerSuccess = function (response) {
  console.log(response.survey.results)
}

const onSubmitAnswerFailure = function (response) {
  console.log('lol nope')
}

module.exports = {
  onCreateSurveySuccess,
  onCreateSurveyFailure,
  onGetSurveysSuccess,
  onGetSurveysFailure,
  onUpdateSurveySuccess,
  onUpdateSurveyFailure,
  onTakeSurveysSuccess,
  onTakeSurveysFailure,
  onSubmitAnswerSuccess,
  onSubmitAnswerFailure
}
