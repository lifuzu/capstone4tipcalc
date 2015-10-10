class Routes {

  static register(name, handler) {
    if (this.handlers == null) this.handlers = {}
    this.handlers[name] = handler
  }
  static get(name, params) {
    if (this.handlers[name] == null) throw new Error('unknown route')
    return this.handlers[name](params)
  }
  static FormScreen() {
    var screen = require('./components/FormScreen');
    return {
      component: screen,
      key: screen.key,
      title: screen.title,
    }
  }
}

module.exports = Routes