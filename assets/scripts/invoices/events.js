const showItemTemplate = require('../templates/item.handlebars')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
class InvoiceEvents {
  constructor() {
    this.listenToSubmitForm()
    this.listenToAddItemButton()
  }
  listenToSubmitForm() {
    $('#invoice-form').on('submit', this.onSubmitForm)
  }
  onSubmitForm(event) {
    event.preventDefault()
    const target = event.target
    const data = getFormFields(target)
    api.createInvoice(data)
  }
  listenToAddItemButton() {
    $('#add-item-btn').on('click', this.onClickAddItemButton)
  }
  onClickAddItemButton(event) {
    const target = event.target
    const item = {}
    target.parentNode.parentNode.childNodes.forEach(node => {
      if (node.dataset && node.dataset.item) {
        item[node.dataset.item] = node.value
        node.value = ''
      }
    })
    // const template = Handlebars.compile('<p>{{description}} {{unit_price}} {{quantity}}</p>')
    const numItems = $('#items-container .input-group').length
    item.num = numItems
    const itemHtml = showItemTemplate(item)
    $('#items-container').prepend(itemHtml)
  }
}

module.exports = new InvoiceEvents