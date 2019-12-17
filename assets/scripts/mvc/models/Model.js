import _ from 'lodash'

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
  sendUpdate() {
    $.ajax({
      url: this._url,
      method: 'PUT',
      data: this._getData()
    })
    return this
  }
}