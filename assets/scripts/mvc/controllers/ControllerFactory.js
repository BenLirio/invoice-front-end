import { store } from '../../store'
import { Controller } from './Controller'
export class ControllerFactory {
  buildControllers(name, associations) {
    const controller = new Controller(name)
    store.controllers[name] = controller
    this.associations = {}
    this.associations.hasMany = {}
    this.associations.belongTo = {}
    return controller
  }
  addAssociation(current, type, target) {
    store.controllers[current].associations.push(new Association(type, target))
  }
}
class Association {
  constructor(type, target) {
    this.type = type
    this.name = target
  }
}
function buildControllers(singularName, belongsTo, hasMany) {
  buildController(singularName)
  hasMany.forEach(buildController)
  belongsTo.forEach(buildController)
}

function buildController(singularName) {
  if(!store.controllers[singularName]) {
    build(pluralize(singularName))
    controllerFactory.buildController(singularName)
  }
}