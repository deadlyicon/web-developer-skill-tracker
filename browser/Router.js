import SimpleReactRouter from 'simple-react-router'

import NotFoundPage from './components/NotFoundPage'
import HomePage from './components/HomePage'
import SkillIndexPage from './components/SkillIndexPage'
import SkillShowPage from './components/SkillShowPage'

export default class Router extends SimpleReactRouter {
  getRoutes(map, {state}){
    map('/',                   HomePage)
    map('/skills',             SkillIndexPage)
    map('/skills/:skillSlug',  SkillShowPage)
    map('/:path*',             NotFoundPage)
  }
}
