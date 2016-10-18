import Immutable from 'seamless-immutable'
import request from '../request'

let state = {
  allSkillIds: null,
  skills: {},
  tags: {},
  skillIdsBySlug: {},
}
let subscribers = []

const getState = () => Immutable(state)

const publish = () => {
  subscribers.forEach(subscriber => {
    subscriber(getState())
  })
}

const subscribe = (subscriber) => {
  subscribers.push(subscriber)
}

const unsubscribe = (subscriber) => {
  subscribers = this.subscribers
    .filter(sub => subscriber !== sub)
}

const loadSession = () => {
  request.getJSON('/session').then(session => {

  })
}

const loadSkills = () => {
  state.allSkillIds || reloadSkills()
}

const addSkillToState = (skill) => {
  state.skills[skill.id] = skill
  state.skillIdsBySlug[skill.slug] = skill.id
}

const reloadSkills = () => {
  request.getJSON('/api/skills')
    .then(skills => {
      skills.forEach(addSkillToState)
      state.allSkillIds = skills.map(skill => skill.id)
      publish()
    })
    .catch(error => {
      if (error.response.status === 404)
      console.warn('reloadSkills failed', error)
      console.error(error)
    })
}

const loadSkillBySlug = (skillSlug) => {
  request.getJSON(`/api/skills/${skillSlug}`)
    .then(skill => {
      addSkillToState(skill)
      publish()
    })
    .catch(error => {
      if (error.response && error.response.status === 404){
        state.skillIdsBySlug[skillSlug] = null
        publish()
      }else{
        console.warn('reloadSkills failed', error)
        console.error(error)
        throw error
      }
    })
}


export default {
  getState,
  subscribe,
  unsubscribe,
  loadSkills,
  reloadSkills,
  loadSkillBySlug,
}
