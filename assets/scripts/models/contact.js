const ActiveModel = require('./ActiveModel')
class Contact extends ActiveModel {
  constructor() {
    this.name = name
    this.number = number
    this.email = email
    this.address = address
  }
}

module.exports = Contact