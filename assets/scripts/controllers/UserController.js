const InvoiceController = require('./invoice_controller')

class UserController {
  constructor() {
    this.invoices = InvoiceController
    this.invoices.setUpModels()
  }
  
}

module.exports = new UserController