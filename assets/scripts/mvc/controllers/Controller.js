import { store } from '../../store'
import { plural as pluralize } from 'pluralize'
import { ModelFactory } from '../models/ModelFactory'
export class Controller {
  constructor(name) {
    this.name = name
    this.modelFactory = new ModelFactory(name)
    this.associations = {}
    store.models[pluralize(name)] = {}
    this.models = store.models[pluralize(name)]
    
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