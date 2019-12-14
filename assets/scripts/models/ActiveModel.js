class ActiveModel {
  constructor(id) {
    this.id = id
    this.route = this.getRoute()
  }
  getRoute(id) {
    return `${apiUrl}/${this.getPluralLowerCase()}/${id}`
  }
  getPluralLowerCase() {
    return pluralize(this.getLowerCaseName())
  }
  getLowerCaseName() {
    return this.constructor.name.toLowerCase()
  }
  async requestUpdate() {
    let res = {}
    try {
      res = await $.ajax({ url:this.route })
    } catch (e) {
      console.log(this.constructor.name,'failed to update')
      console.error(e)
      res = {}
    }
    const properties = res[this.getLowerCaseName()]
    for (const key in properties) {
      this[key] = properties[key]
    }
  }
}

module.exports = ActiveModel