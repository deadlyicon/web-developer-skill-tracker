import Immutable from 'seamless-immutable'

const state = {
  currentUser: null,
  allSkillIds: null,
  skills: {},
  tags: {},
  skillIdsBySlug: {},
}

window.DEBUG = window.DEBUG || {}
window.DEBUG.__state = state;

let currentState = Immutable(state)

export const getState = () => {
  return currentState = currentState || Immutable(state)
}

export const setState = (updates) => {
  if (typeof updates === 'function') {
    updates(state)
  }else{
    Object.assign(state, updates)
  }
  currentState = null
  schedulePublish()
}

let subscribers = []
let publishTimeout = null

const schedulePublish = () => {
  if (publishTimeout) return
  publishTimeout = setTimeout(() => {
    publishTimeout = null
    publish()
  })
}

const publish = () => {
  const state = getState()
  subscribers.forEach(subscriber => subscriber(state))
}

export const subscribe = (subscriber) => {
  subscribers.push(subscriber)
}

export const unsubscribe = (subscriber) => {
  subscribers = this.subscribers
    .filter(sub => subscriber !== sub)
}

