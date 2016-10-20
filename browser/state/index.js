import Immutable from 'seamless-immutable'

let state = {
  currentUser: null,
  allSkillIds: null,
  skills: {},
  tags: {},
  skillIdsBySlug: {},
}

let currentState = Immutable(state)

export const getState = () => {
  return currentState = currentState || Immutable(state)
}

export const setState = (updates) => {
  let lastState = currentState
  Object.assign(state, updates)
  currentState = null
  // console.log('setState', updates, {from: lastState, to: state})
  schedulePublish()
}

let subscribers = []
let publishTimeout = null

const schedulePublish = () => {
  if (publishTimeout) return
  console.log('scheduling publish')
  publishTimeout = setTimeout(() => {
    publishTimeout = null
    publish()
  })
}

// export { schedulePublish as publish }

const publish = () => {
  const state = getState()
  console.log('publishing STATE', JSON.parse(JSON.stringify(state)))
  subscribers.forEach(subscriber => subscriber(state))
}

export const subscribe = (subscriber) => {
  subscribers.push(subscriber)
}

export const unsubscribe = (subscriber) => {
  subscribers = this.subscribers
    .filter(sub => subscriber !== sub)
}

