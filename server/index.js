import './env'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import errorHandlers from './errorHandlers'
import authRoutes from './authRoutes'
import apiRoutes from './api'

const publicPath = path.resolve(__dirname, '../public')

const server = express()

// Settings
server.set('env', process.env.NODE_ENV)
server.set('port', process.env.PORT || '3000')

// Middleware
server.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}))
server.use(express.static(publicPath))
server.use(bodyParser.json())

// Routes
server.use(authRoutes)
server.use('/api', apiRoutes)
server.get('/*', (request, response) => {
  response.sendFile(publicPath+'/index.html')
});
server.use(errorHandlers)

if (process.env.NODE_ENV !== 'test'){
  console.log('http://localhost:'+server.get('port')+'/')
  server.listen(server.get('port'))
}

export default server
