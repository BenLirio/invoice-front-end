const pluralize = require('pluralize')
const apiUrl = require('../../config').apiUrl
const getName = function(name) {
  return name.match(/([A-Z][a-z]+)/)[0].toLowerCase()
}
const getRoute = function(pluralName) {
  return `${apiUrl}/${pluralName}`
}

module.exports = {
  getRoute,
  pluralize,
  getName
}