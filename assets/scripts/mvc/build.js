'use strict'
import { ControllerFactory } from './controllers/ControllerFactory'
import { ModelFactory } from './models/ModelFactory'
import { singular as singularize, plural as pluralize } from 'pluralize'
import { store } from '../store'
import { apiUrl } from '../config'

const controllerFactory = new ControllerFactory()
const modelFactory = new ModelFactory()


export function build(pluralName) {
  requestModels(pluralName)
    .then( res => {
      receivedModels(res, pluralName)
    })
}
function requestModels(pluralName) {
  return $.ajax({url:`http://localhost:4741/${pluralName}`})
}

function receivedModels(res, pluralName) {
  const singularName = singularize(pluralName)
  const formatedRes = format(res, pluralName)
  buildControllers(singularName, getDependencies(formatedRes[0]))
  modelFactory.buildModels(formatedRes)
  console.log(store)
}
function buildControllers(singularName, dependencies) {
  console.log(singularName, dependencies)
  controllerFactory.buildController(singularName)
  dependencies.forEach(dependency => {
    controllerFactory.buildController
  })
  
}



function format(res, name) {
  const models = res[name]
  privatize(models)
  assignNames(models, name)
  assignUrl(models, name)
  return models
}
function assignUrl(models, name) {
  models.forEach( model => {
    model._url = `${apiUrl}/${model._pluralName}/${model._id}`
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

function getName(res) {
  return singularize(_.keys(res)[0])
}

function privatize(models) {
  models.forEach( model => {
    _.keys(model).forEach( key => {
      model[`_${key}`] = model[key]
      delete model[key]
    })
  })
}

function getDependencies(model) {
  const idExpression = /^.+_id$/
  let belongsTo = []
  _.keys(model).forEach(property => {
    if (idExpression.test(property)) {
      belongsTo.push(property.slice(0,-3).slice(1))
    }
  })
  return belongsTo
}