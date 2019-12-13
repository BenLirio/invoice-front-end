const getFormFields = require('../../../lib/get-form-fields')
class Events {
  constructor() {
    this.listenToInvoiceForm()
  }
  listenToInvoiceForm() {
    $('#invoice-form').on('submit', this.submitInvoiceForm)
  }
  submitInvoiceForm(event) {
    event.preventDefault()
    const target = event.target
    const data = getFormFields(target)
    console.log(data)
  }
}



module.exports = new Events