const ModelBase = require('./ModelBase')
class Item extends ModelBase {
  constructor(properties) {
    super(properties)
  }
}
Item.belongsTo = 'invoice'
module.exports = Item