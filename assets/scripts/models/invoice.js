const ModelBase = require('./ModelBase')
class Invoice extends ModelBase {
  constructor(properties) {
    super(properties)
  }
}

Invoice.hasMany = ['items']

module.exports = Invoice