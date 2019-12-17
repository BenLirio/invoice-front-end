import { store } from '../../store'
import { plural as pluralize } from 'pluralize'
import { ModelFactory } from '../models/ModelFactory'
const getFormFields = require('../../../../lib/get-form-fields')
import { requestModels } from '../build'

export class Controller {
  constructor(name) {
    this.name = name
    this.modelFactory = new ModelFactory(name)
    this.associations = {}
    store.models[pluralize(name)] = {}
    this.models = store.models[pluralize(name)]
    this.controllerTemplate = require('../../templates/controller.handlebars')
    $('#models').on('click', '.delete-btn', event => {
      this.models[event.target.dataset.id].delete()
    })
    setInterval(()=>requestModels(pluralize(this.name)), 3000)
  }
  displayController(params) {
    this.controllerHtml = this.controllerTemplate({
      name: this.name,
      params
    })
    $('#controllers').append(this.controllerHtml)
    $('#' + this.name).on('submit', e => {
      this.formSubmit(e)
    })
  }
  formSubmit(e) {
    e.preventDefault()
    const data = getFormFields(e.target)
    this.create(data)
  }
  create(data) {
    this.modelFactory.create(data)
  }
  buildModels(models) {
    this.modelFactory.buildModels(models)
  }
  all() {
    return _.keys(this.models).map(key => this.models[key])
  }
}