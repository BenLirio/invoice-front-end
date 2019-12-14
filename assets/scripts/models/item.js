const ModelBase = require('./ModelBase')
class Item extends ModelBase {
  constructor(properties) {
    super(properties)
    this._belongsTo = 'invoice'
  }
}

module.exports = Item