'use strict'
import _ from 'lodash'
import { store } from '../../store'
import { Model } from './Model'


export class ModelFactory {
  buildModels(modelsData) {
    modelsData.forEach( modelData => {
      const id = modelData._id
      const pluralName = modelData._pluralName
      this.buildContainer(pluralName)
      if(!this.modelExists(id, pluralName)) {
        this.buildModel(modelData, pluralName)
      }
    })
  }
  buildModel(modelData) {
    const model = new Model(modelData)
    store.models[modelData._pluralName][modelData._id] = model
  }
  buildContainer(pluralName) {
    if(!store.models[pluralName]) {
      store.models[pluralName] = {}
    }
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








