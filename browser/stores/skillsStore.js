import Store from '../Store'

const skillsStore = new Store({
  fetch(){
    return this.getJSON('/api/skills')
  }
})

window.skillsStore = skillsStore

export default skillsStore
