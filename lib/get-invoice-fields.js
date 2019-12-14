const getInvoiceFields = form => {
  const target = {}

  const elements = form.elements || []
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i]
    if (!e.hasAttribute('name')) {
      continue
    }
    const name = e.getAttribute('name')
  }


  target = {
    meta: {
      title: 'text',
      sent_date: 'date',
      due_date: 'date',
      payment_method: 'text',
      notes: 'text',
      status: 'sent'
    },
    user: {
      contact: {
        name: 'text',
        number: 'text',
        email: 'text',
        address: 'text'
      }
    },
    customer: {
      contact: {
        name: 'text',
        number: 'text',
        email: 'text',
        address: 'text'
      }
    },
    items: [
      {
        description: 'text',
        unit_price: 'integer',
        quantity: 'integer'
      },
      {
        description: 'text',
        unit_price: 'integer',
        quantity: 'integer'
      }
    ]
  }
}

module.exports = getInvoiceFields