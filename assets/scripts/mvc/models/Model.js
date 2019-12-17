import _ from 'lodash'
import { store } from '../../store'

export class Model {
  constructor(params = {}) {
    _.assign(this, params)
    this._createdAt = Date.now()
  }
  _getData() {
    const data = {}
    _.keys(this).filter(key => !/^_/.test(key)).forEach(key => {
      data[key] = this[key]
    })
    return data
  }
  save() {
    $.ajax({
      url: this._url,
      method: 'PUT',
      data: this._getData()
    })
    return this
  }
  delete() {
    // delete store.controllers
    delete store.models[this._pluralName][this._id]
    $.ajax({
      url: this._url,
      method: 'DELETE'
    })

  }
}