import Immutable from 'seamless-immutable'
import request from '../request'
import { getState, setState } from '../state'

export const loadCurrentUser = () => {
  request.getJSON('/current-user').then(currentUser => {
    setState({currentUser})
  })
}

export const logout = () => {
  request.postJSON('/logout').then(() => {
    setState({currentUser: null})
  })
}

export const loadSkills = () => {
  getState().allSkillIds || reloadSkills()
}

export const addSkillToState = (skill) => {
  const state = getState()
  setState( state => {
    state.skills[skill.id] = skill
    state.skillIdsBySlug[skill.slug] = skill.id
  })
}

export const reloadSkills = () => {
  request.getJSON('/api/skills')
    .then(skills => {
      skills.forEach(addSkillToState)
      setState({
        allSkillIds: skills.map(skill => skill.id)
      })
    })
    .catch(error => {
      console.warn('reloadSkills failed', error)
      console.error(error)
    })
}

export const loadSkillBySlug = (skillSlug) => {
  request.getJSON(`/api/skills/${skillSlug}`)
    .then(skill => {
      addSkillToState(skill)
    })
    .catch(error => {
      if (error.response && error.response.status === 404){
        setState(state => {
          state.skillIdsBySlug[skillSlug] = null
        })
      }else{
        console.warn('reloadSkills failed', error)
        console.error(error)
        throw error
      }
    })
}

export const createSkill = (skill) => {
  return request.postJSON('/api/skills', skill)
    .then(skill => {
      addSkillToState(skill)
      return skill
    })
}
