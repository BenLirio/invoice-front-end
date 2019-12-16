'use strict'
import _ from 'lodash'
import { store } from '../../store'
import { Model } from './Model'
import { plural as pluralize } from 'pluralize'


export class ModelFactory {
  buildModels(modelsData, associations) {
    modelsData.forEach( modelData => {
      const id = modelData._id
      const pluralName = modelData._pluralName
      if(!this.modelExists(id, pluralName)) {
        this.buildModel(modelData, associations)
      }
    })
  }
  buildModel(modelData, associations) {
    const model = new Model(modelData)
    associations.hasMany.forEach(has => {
      model[pluralize(has)] = function() {
        return _.keys(store.models[pluralize(has)]).filter(key => {
          const id = store.models[pluralize(has)][key][`_${this._singularName}_id`]
          return id === this._id
        }).map(key => store.models[pluralize(has)][key])
      }
    })
    associations.belongsTo.forEach(belongs => {
      model[belongs] = function() {
        const referenceId = this[`_${belongs}_id`]
        return store.models[pluralize(belongs)][referenceId]
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








