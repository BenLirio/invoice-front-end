'use strict'
import _ from 'lodash'
import { store } from '../../store'
import { Model } from './Model'
import { plural as pluralize, isPlural, singular as singularize } from 'pluralize'
import { apiUrl } from '../../config'


export class ModelFactory {
  constructor(name) {
    this.name = name
    this.associations = {}
    this._url = `${apiUrl}/${pluralize(this.name) || ''}`
    this.params = null
  }

  create(data = this.params) {
    $.ajax({
      url: this._url,
      method: 'POST',
      data
    }).then(res => {
      _.keys(res[this.name]).forEach( key => {
        if(/id/.test(key)){
          res[this.name]._id = res[this.name].id
          delete res[this.name].id
        }
        if(key === 'has_many') {
          delete res[this.name][key]
        }
      })
      res[this.name]._singularName = this.name
      res[this.name]._pluralName = pluralize(this.name)
      res[this.name]._url = `${apiUrl}/${res[this.name]._pluralName}/${res[this.name]._id}`

      this.buildModel(res[this.name])
    })
  }


  buildModels(modelsData) {
    modelsData.forEach( modelData => {
      const id = modelData._id
      const pluralName = modelData._pluralName
      if(!store.models[modelData._pluralName][id]) {
        this.buildModel(modelData)
      }
    })
  }
  buildModel(modelData) {
    if(this.params === null) {
      this.params = {}
      this.params[modelData._singularName] = {}
      _.keys(modelData).filter(key => !/^_/.test(key)).forEach(key => {
        this.params[modelData._singularName][key] = typeof key
      })
      store.controllers[modelData._singularName].displayController(this.params[modelData._singularName])
    }
    const model = new Model(modelData)
    const myAssociations = store.controllers[model._singularName].associations
    _.keys(this.associations).forEach( key => {
      const foreignAssociations = store.controllers[singularize(key)].associations
      if(isPlural(key)) {
        // Create local model in my controller
        if(!myAssociations[model._singularName][model._id]) {
          myAssociations[model._singularName][model._id] = {}
        }
        Object.assign(myAssociations[model._singularName][model._id], model)
        // point my model to foreign controller
        model[`_${key}`] = foreignAssociations[key][model._id]
        Object.defineProperty(model, key, { get: function() { return this[`_${key}`]} })
      } else {
        if(!myAssociations[model._pluralName][model[`_${key}_id`]]) {
          myAssociations[model._pluralName][model[`_${key}_id`]] = []
        }
        myAssociations[model._pluralName][model[`_${key}_id`]].push(model)
        if(!foreignAssociations[key][model[`_${key}_id`]]) {
          foreignAssociations[key][model[`_${key}_id`]] = {}
        }
        model[`_${key}`] = foreignAssociations[key][model[`_${key}_id`]]
        Object.defineProperty(model, key, { get: function() { return this[`_${key}`]} })
      }
    })
    store.models[modelData._pluralName][modelData._id] = model
  }
}








