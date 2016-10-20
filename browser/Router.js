import SimpleReactRouter from 'simple-react-router'

import NotFoundPage from './components/NotFoundPage'
import HomePage from './components/HomePage'
import SkillIndexPage from './components/SkillIndexPage'
import NewSkillPage from './components/NewSkillPage'
import SkillShowPage from './components/SkillShowPage'

export default class Router extends SimpleReactRouter {
  getRoutes(map, {state}){
    map('/',                   HomePage)
    map('/skills',             SkillIndexPage)
    map('/skills/new',         NewSkillPage)
    map('/skills/:skillSlug',  SkillShowPage)
    map('/:path*',             NotFoundPage)
  }
}
