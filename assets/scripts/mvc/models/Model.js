import _ from 'lodash'
import { store } from '../../store'

export class Model {
  constructor(params = {}) {
    _.assign(this, params)
    this._createdAt = Date.now()
    this._modelTemplate = require('../../templates/model.handlebars')
    this.displayModel()
  }
  displayModel() {
    const modelHtml = this._modelTemplate({
      id: this._id,
      name: this._singularName,
      data: this._getData()
    })
    $('#models').prepend(modelHtml)
    this.myUpdateInterval = setInterval(()=>this.refresh(), 1500)
    $('#'+this._singularName+'-'+this._id).on('keyup', e => {
      let shouldDelete = true
      $('#'+this._singularName+'-'+this._id+' input').each((key, value) => {
        this[value.name] = value.value
        if(value.value.length !== 0) {
          shouldDelete = false
        }
      })
      if(shouldDelete) {
        this.delete()
      } else {
      this.save()
      }
      
    })
  }
  _getData() {
    const data = {}
    _.keys(this).filter(key => !/^_/.test(key)).forEach(key => {
      data[key] = this[key]
    })
    return data
  }
  save() {
    $.ajax({
      url: this._url,
      method: 'PUT',
      data: {
        [this._singularName]: this._getData()
      }
    })
    return this
  }
  refresh() {
    $.ajax({
      url: this._url,
      method: 'GET',
    }).then(res=>this.updateParams(res)).catch(()=>this.delete())
  }
  updateParams(res) {
    const data = res[this._singularName]
    _.keys(data).forEach((key) => {
      if(key !== 'id' && key !== 'has_many') {
        
      }
    })
    $('#'+this._singularName+'-'+this._id+' input').each((key,input)=> {
      this[input.name] = data[input.name]
      input.value = data[input.name]
    })
  }
  delete() {
    // delete store.controllers
    clearInterval(this.myUpdateInterval)
    delete store.models[this._pluralName][this._id]
    $('#'+this._singularName+'-'+this._id).hide()
    $()
    $.ajax({
      url: this._url,
      method: 'DELETE',
    })

  }
}