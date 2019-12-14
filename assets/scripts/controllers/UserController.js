const InvoiceController = require('./invoice_controller')

class UserController {
  constructor() {
    this.invoices = InvoiceController
  }
}

module.exports = new UserController