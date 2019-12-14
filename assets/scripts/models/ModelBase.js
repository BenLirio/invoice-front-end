'use strict'
import _ from 'lodash'
export default class ModelBase {
  constructor(data) {
    _.assign(this, data)
  }
}
