const base = require('./helper/base')
class ModelBase {
  static get hasMany() {
    return this._hasMany
  }
  static set hasMany(v) {
    this._hasMany = v
  }
  static get belongsTo() {
    return this._belongsTo
  }
  static set belongsTo(v) {
    this._belongsTo = v
  }
  constructor(properties) {
    Object.assign(this, properties)
    this._name = base.normalize(this.constructor.name)
    this._pluralName = base.pluralize(this._name)
    this._route = base.getRoute(this._pluralName, this.id)
    this._lastUpdated = Date.now()
  }




  // Refresh Model
  async requestUpdate() {
    let res = {}
    try {
      res = await $.ajax({ url:this._route })
    } catch (e) {
      // TODO GET RID OF COMMENTS
      console.log(this.constructor.name,'failed to update')
      console.error(e)
      res = {}
    }
    this.updateProperties(res[this.name])
  }
  updateProperties(data) {
    for (const key in data) {
      this[key] = data[key]
    }
    this._lastUpdated = Date.now()
  }
}
module.exports = ModelBase