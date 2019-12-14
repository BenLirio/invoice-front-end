'use strict'
import _ from 'lodash'
export default class ModelBase {
  static get hasMany() {
    return this._hasMany
  }
  static set hasMany(v)  {
    this._hasMany = v
  }
  constructor(data) {
    _.assign(this, data)
    
  }
}
ModelBase.hasMany = []