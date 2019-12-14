const base = require('./helper/base')
class ControllerBase {
  constructor() {
    this._name = base.getName(this.constructor.name)
    this._pluralName = base.pluralize(this._name)
    this._route = base.getRoute(this._pluralName)
    this[`_${this._pluralName}`] = new Array
    this._model = require(`../models/${this._name}`)
    this.init()
  }

  all() {
    return this[`_${this._pluralName}`]
  }

  async init() {
    let res
    try {
      res = await $.ajax({url: this._route})
    } catch (e) {
      console.error('index failed')
      console.error(e)
      res = {}
    }
    // not under dashed because this is from the response
    const models = res[this._pluralName]
    if (this._model._belongsTo) {
      this.createBelongsTo(models)
    } else {
      this.create(models)
    }
  }
  create(models) {
    for (const key in models) {
      const model = new this._model(models[key])
      this[`_${this._pluralName}`].push(model)
    }
  }
  createBelongsTo(models) {
    for (const key in models) {
      const model = new this._model(models[key])
      this[`_${this._pluralName}`].push(model)
    }
  }
}

module.exports = ControllerBase