const apiUrl = require('../config').apiUrl
const pluralize = require('pluralize')

const getRoute = function() {
  return `${apiUrl}/${this.getPluralLowerCase()}/${id}`
}

module.exports = {
  getRoute
}