'use strict'
import _ from 'lodash'
import { store } from '../../store'
import { Model } from './Model'
import { plural as pluralize, isPlural, singular as singularize } from 'pluralize'


export class ModelFactory {
  constructor(name) {
    this.name = name
    this.associations = {}
  }
  buildModels(modelsData) {
    modelsData.forEach( modelData => {
      const id = modelData._id
      const pluralName = modelData._pluralName
      if(!this.modelExists(id, pluralName)) {
        this.buildModel(modelData)
      }
    })
  }
  buildModel(modelData) {
    const model = new Model(modelData)
    const myAssociations = store.controllers[model._singularName].associations
    _.keys(this.associations).forEach( key => {
      const foreignAssociations = store.controllers[singularize(key)].associations
      if(isPlural(key)) {
        // Create local model in my controller
        Object.assign(myAssociations[model._singularName][model._id], model)
        // point my model to foreign controller
        model[`_${key}`] = foreignAssociations[key][model._id]
      } else {
        if(!myAssociations[model._pluralName][model[`_${key}_id`]]) {
          myAssociations[model._pluralName][model[`_${key}_id`]] = []
        }
        myAssociations[model._pluralName][model[`_${key}_id`]].push(model)
        if(!foreignAssociations[key][model[`_${key}_id`]]) {
          foreignAssociations[key][model[`_${key}_id`]] = {}
        }
        model[key] = foreignAssociations[key][model[`_${key}_id`]]
      }
    })
    store.models[modelData._pluralName][modelData._id] = model
  }

  modelExists(id, pluralName) {
    _.keys(store.models[pluralName]).forEach( key => {
      if(key === id) {
        return true
      }
    })
    return false
  }
}








