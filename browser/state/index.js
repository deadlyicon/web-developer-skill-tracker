import Immutable from 'seamless-immutable'
import request from '../request'

let state = {
  allSkillIds: null,
  skills: null,
  tags: null,
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

const loadSkills = () => {
  state.allSkillIds || reloadSkills()
}

const reloadSkills = () => {
  request.getJSON('/api/skills').then(skills => {
    const skillsMap = {}
    skills.forEach(skill => skillsMap[skill.id] = skill)
    state.allSkillIds = Object.keys(skillsMap)
    state.skills = skillsMap
    publish()
  })
}

const loadSkillBySlug = (skillSlug) => {
  request.getJSON(`/api/skills/${skillSlug}`).then(skill => {
    state.skills = state.skills || {}
    state.skills[skill.id] = skill
    publish()
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
