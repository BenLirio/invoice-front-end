import { store } from '../../store'
import { Controller } from './Controller'
import { plural as pluralize, singular as singularize } from 'pluralize'
export class ControllerFactory {
  controllerExists(name) {
    return !(!store.controllers[name])
  }
  buildController(name) {
    const controller = new Controller(name)
    store.controllers[name] = controller
    return controller
  }
  addAssociations(name, associations) {
    associations.belongsTo.forEach(belongs => {
      store.controllers[name].modelFactory.associations[belongs] = store.controllers[belongs]
    })
    associations.hasMany.forEach(has => {
      store.controllers[name].modelFactory.associations[has] = store.controllers[singularize(has)]
    })
  }
}