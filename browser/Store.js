import request from './request'

class Store {

  constructor(options){
    this.fetch = options.fetch
    this.value = options.initialValue
    this.subscribers = []
  }

  getJSON(...args){
    return request.getJSON(...args)
  }

  postJSON(path, body){
    return request.postJSON(...args)
  }

  load(){
    return this.fetch().then(value => {
      this.value = value
      this.trigger()
      return value
    })
  }

  getValue(){
    if (this.value){
      return Promise.resolve(this.value)
    }else{
      return this.load()
    }
  }

  subscribe(subscriber){
    this.subscribers.push(subscriber)
    this.getValue()
  }

  unsubscribe(subscriber){
    this.subscribers = this.subscribers
      .filter(sub => subscriber !== sub)
  }

  trigger(){
    this.subscribers.forEach(subscriber => {
      subscriber(this.value)
    })
  }

  reload(){
    return this.load()
  }

}

export default Store
