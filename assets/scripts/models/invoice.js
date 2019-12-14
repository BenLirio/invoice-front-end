const ModelBase = require('./ModelBase')
class Invoice extends ModelBase {
  constructor(properties) {
    super(properties)
    this._hasMany = ['items']
  }
}

module.exports = Invoice