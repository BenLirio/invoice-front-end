import { store } from '../../store'
import { plural as pluralize } from 'pluralize'
import { ModelFactory } from '../models/ModelFactory'
export class Controller {
  constructor(name) {
    this.name = name
    this.modelFactory = new ModelFactory(name)
    this.associations = {}
    const models = {}
    store.models[pluralize(name)] = models
    this.models = models
    
  }
  buildModels(models) {
    this.modelFactory.buildModels(models)
  }
}