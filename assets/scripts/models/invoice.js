const ActiveModel = require('./ActiveModel')
class Invoice extends ActiveModel {
  constructor() {
    super()
    this.title = title
    this.sent_date = sentDate
    this.due_date = dueDate
    this.payment_method = paymentMethod
    this.notes = notes
  }
}

module.exports = Invoice