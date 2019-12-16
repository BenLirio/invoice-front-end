import { store } from '../../store'
import { plural as pluralize } from 'pluralize'
export class Controller {
  constructor(name) {
    this.name = name
    this.associations = []
    this.buildModelContainer(pluralize(name))
  }
  buildModelContainer(pluralName) {
    if(!store.models[pluralName]) {
      store.models[pluralName] = {}
    }
  }
}