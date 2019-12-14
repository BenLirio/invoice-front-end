const apiUrl = require('../../config').apiUrl
const pluralize = require('pluralize')

const normalize = function(name) {
  return name.toLowerCase()
}
const getRoute = function(plural, id) {
  return `${apiUrl}/${plural}/${id}`
}

module.exports = {
  normalize,
  pluralize,
  getRoute
}