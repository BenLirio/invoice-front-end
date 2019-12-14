const base = require('./helper/base')
class ControllerBase {
  constructor() {
    this._name = base.getName(this.constructor.name)
    this._pluralName = base.pluralize(this._name)
    this._route = base.getRoute(this._pluralName)
    this[`_${this._pluralName}`] = []
    this._model = require(`../models/${this._name}`)
  }

  find(id) {
    return this[`_${this._pluralName}`].find(model => model.id === id)
  }

  all() {
    return this[`_${this._pluralName}`]
  }

  // filter(prop, val) {
  //   console.log(prop,val)
  //   // return this[`_${this._pluralName}`].map(model => model.id)
  //   console.log(this[`_${this._pluralName}`])
  //   return this[`_${this._pluralName}`].length
  // }
  async setUpModels() {
    if (this._model.hasMany) {
      const hasMany = this._model.hasMany
      hasMany.forEach( has => {
        const hasController = require(`./${base.pluralize.singular(has)}_controller`)
        hasController.setUpModels().then(console.log)
        this.init()
        this._model.prototype[has] = function () {
          return hasController.filter(this.id)
        }
      })
    }
    if (this._model.belongsTo) {
      const belongsTo = this._model.belongsTo
      this.filter = async function (id) {
        await this.init()
        return this[`_${this._pluralName}`]
      }
      this._model.prototype[belongsTo] = function () {
        console.log(this)
      }
    }
    return 'asdf'
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
    const models = res[this._pluralName]
    this.create(models)
  }
  create(models) {
    for (const key in models) {
      const model = new this._model(models[key])
      this[`_${this._pluralName}`].push(model)
    }
  }
}

module.exports = ControllerBase