import SimpleReactRouter from 'simple-react-router'

import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage'



export default class Router extends SimpleReactRouter {
  routes(map){
    map('/',                   HomePage)
    map('/:path*',             NotFoundPage)
  }
}
