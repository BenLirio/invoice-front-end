const ActiveModel = require('./ActiveModel')
class Item extends ActiveModel {
  constructor(id) {
    super(id)
    this.description = 0
    this.unit_price = 0
    this.quantity = 0
  }
}

module.exports = Item