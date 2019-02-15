'use strict'

const store = require('../store')

const onCreateSurveySuccess = function (formData) {
  console.log(formData)
}

const onCreateSurveyFailure = function () {
  console.log('Something went wrong.')
}
const onGetSurveysSuccess = function (response) {
  store.surveys = response.surveys
  console.log(response.surveys)
}

const onGetSurveysFailure = function () {
  console.log('Something went wrong.')
}
module.exports = {
  onCreateSurveySuccess,
  onCreateSurveyFailure,
  onGetSurveysSuccess,
  onGetSurveysFailure
}
