const apiUrl = require('../config').apiUrl
class InvoiceApi {
  constructor() {

  }
  createInvoice(data) {
    $.ajax({
      url: apiUrl + '/invoices',
      method: 'POST',
      data
    })
  }
}

module.exports = new InvoiceApi