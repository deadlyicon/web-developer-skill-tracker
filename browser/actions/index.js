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
  setState({
    skills: state.skills.merge({[skill.id]: skill}),
    skillIdsBySlug: state.skillIdsBySlug.merge({[skill.slug]: skill.id}),
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
        setState({
          skillIdsBySlug: getState().skillIdsBySlug.merge({[skillSlug]: null}),
        })
      }else{
        console.warn('reloadSkills failed', error)
        console.error(error)
        throw error
      }
    })
}
