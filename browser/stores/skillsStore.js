import Store from '../Store'

const skillsStore = new Store({
  fetch(){
    return this.getJSON('/api/skills')//.then(request => request.json)
  }
})

window.skillsStore = skillsStore

export default skillsStore
