'use strict'

const userEvents = require('./auth/events.js')
const surveyEvents = require('./surveys/events.js')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  userEvents.addHandlers()
  surveyEvents.addHandlers()
  $('#change-password, #sign-out-button, #create-survey, #show-surveys-button, #take-surveys-button, #create-survey-button').hide()
})
