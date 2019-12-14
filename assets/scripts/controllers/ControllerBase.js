const base = require('./helper/base')
class ControllerBase {
  constructor() {
    this._name = base.getName(this.constructor.name)
    this._pluralName = base.pluralize(this._name)
    this._route = base.getRoute(this._pluralName)
    this[`_${this._pluralName}`] = []
    this._model = require(`../models/${this._name}`)
    this.init()
  }

  find(id) {
    return this[`_${this._pluralName}`].find(model => model.id === id)
  }

  all() {
    // find my controller I belong to
    // link then link the model to the other model
    // I need id here but this is a public plural class

    console.log('this',this)
    if (this._model.belongsTo) {
      this[`_${this._pluralName}`].forEach(model => {
        console.log(model)
      })
    } else {
      return this[`_${this._pluralName}`]
    }
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
    // checks if the model has many and is an array
    if (this._model.belongsTo) {
      const parent = this._model.belongsTo
      const parentController = require(`./${this._model.belongsTo}_controller`)
      models.forEach(model => {
        const parentModel = parentController.find(model[`${parent}_id`])
        model[parent] = parentModel
      })
      this.create(models)
    }
    if (this._model.hasMany) {
      // delegate this to my model
      this.create(models)
    }
    
  }
  create(models) {
    for (const key in models) {
      const model = new this._model(models[key])
      this[`_${this._pluralName}`].push(model)
    }
  }
  createHasMany(models) {
    this._model.hasMany.forEach( hasMany => {
      this._model.prototype[hasMany] = require(`./${base.pluralize.singular(hasMany)}_controller`)
    })
  }
}

module.exports = ControllerBase