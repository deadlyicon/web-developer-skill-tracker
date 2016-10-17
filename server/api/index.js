import express from 'express'
import skillsRoutes from './skills'

const router = new express.Router()

// router.use((request, response, next) => {
//   if (request.session.userId) return next()
//   response.status(400).json({
//     error: 'Not Authorized'
//   })
// })

router.use('/skills', skillsRoutes)

export default router
