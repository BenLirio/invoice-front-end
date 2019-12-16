import { store } from '../../store'
import { Controller } from './Controller'
export class ControllerFactory {
  buildController(name) {
    const controller = new Controller(name)
    store.controllers[name] = controller
    return controller
  }
}
