'use strict'

const config = require('../config')
const store = require('../store')

const createSurvey = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const getSurveys = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const updateSurvey = function (formData, target) {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + target,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(formData),
    contentType: 'application/json'
  })
}

const takeSurveys = function (formData) {
  return $.ajax({
    url: config.apiUrl + '/surveys',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

const submitAnswer = function (surveyId, answer) {
  return $.ajax({
    url: config.apiUrl + '/answers',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify({survey: surveyId, answer: answer}),
    contentType: 'application/json'
  })
}

const deleteSurvey = (target) => {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + target,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getSurveyStats = function (target) {
  return $.ajax({
    url: config.apiUrl + '/surveys/' + target + '/stats',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createSurvey,
  getSurveys,
  updateSurvey,
  takeSurveys,
  submitAnswer,
  deleteSurvey,
  getSurveyStats
}
