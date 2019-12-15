'use strict'
import _ from 'lodash'
export function build(data) {
  for (const model in data) {
    ModelFactory.create(model)
  }
}


function ModelFactory() {
  
}
