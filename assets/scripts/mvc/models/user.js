'use strict'
import ModelBase from './ModelBase'
export default class User extends ModelBase {
  constructor(data) {
    super(data)
    console.log(this.constructor.name)
  }
}
User.hasMany = ['invoices']