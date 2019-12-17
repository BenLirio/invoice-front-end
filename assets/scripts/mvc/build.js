'use strict'
import { ControllerFactory } from './controllers/ControllerFactory'
import { ModelFactory } from './models/ModelFactory'
import { singular as singularize, plural as pluralize } from 'pluralize'
import { store } from '../store'
import { apiUrl } from '../config'
import { request } from 'http'

const controllerFactory = new ControllerFactory()
const modelFactory = new ModelFactory()

export const requestModels = async function requestModels(pluralName) {
  // PAUSE HERE UNTIL RESPONSE FROM SERVER
  const res = await $.ajax({url:`http://localhost:4741/${pluralName}`})

  // Format
  const singularName = singularize(pluralName)
  const formatedRes = format(res, pluralName)

  // Build Controller
  const controller = controllerFactory.buildController(singularName)

  // Get relations
  const belongsTo = getBelongsTo(formatedRes[0])
  const hasMany = getHasMany(formatedRes[0])
  for(let i = 0; i < hasMany.length; i++) {
    const has = hasMany[i]
    if (!store.controllers[singularize(has)]) {
      await requestModels(has)
    }
  }
  for(let i = 0; i < belongsTo.length; i++) {
    const belongs = belongsTo[i]
    formatedRes.forEach(model => {
      delete model[belongs]
    })
    if (!store.controllers[belongs]) {
      await requestModels(pluralize(belongs))
    }
  }

  // Back to top
  controllerFactory.addAssociations(singularName, {belongsTo, hasMany})
  setTimeout(()=> {
    controller.buildModels(formatedRes)
  },0)
}



function format(res, name) {
  const models = res[name]
  privatize(models)
  assignNames(models, name)
  assignUrl(models, name)
  return models
}
function privatize(models) {
  models.forEach( model => {
    _.keys(model).forEach( key => {
      if(key === 'id' || /_id$/.test(key) || key === 'has_many') {
        
        model[`_${key}`] = model[key]
        delete model[key]
      }
    })
  })
}
function assignNames(models, name) {
  const names = {
    _pluralName: name,
    _singularName: singularize(name)
  }
  models.forEach(model => {
    _.assign(model, names)
  })
  return models
}
function assignUrl(models) {
  models.forEach( model => {
    model._url = `${apiUrl}/${model._pluralName}/${model._id}`
  })
}



function getBelongsTo(model) {
  const idExpression = /^.+_id$/
  let belongsTo = []
  _.keys(model).forEach(property => {
    if (idExpression.test(property)) {
      belongsTo.push(property.slice(0,-3).slice(1))
    }
  })
  return belongsTo
}
function getHasMany(model) {
  return (model._has_many || [])
}