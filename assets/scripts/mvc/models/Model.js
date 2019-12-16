import _ from 'lodash'

export class Model {
  constructor(params = {}) {
    _.assign(this, params)
    this._createdAt = Date.now()
  }
}