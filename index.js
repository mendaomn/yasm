class Store {
  constructor(initialState = {}) {
    this.state = initialState
    this.subscribers = []
  }

  _publish(path) {
    this.subscribers.forEach(sub => {
      if (!path || !sub.path || sub.path === path) {
        sub.callback(this.state)  
      }
    })
  }

  getState() {
    return this.state
  }

  setState(newState, path) {
    if (!path) {
      this.state = newState
    } else {
      const props = path.split('.')
      let select = this.state
      let part
      for(let i = 0; i < props.length - 1; i++) {
        part = props[i]
        select = select[part]
      }
      select[props.pop()] = newState
    }

    this._publish(path)
  }

  subscribe(callback, path) {
    this.subscribers.push({
      path,
      callback
    })
  }
}

module.exports = function init(initialState = {}) {
  return new Store(initialState)
}