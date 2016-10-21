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


// render 404 not found
router.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// catch and render errors
router.use((error, request, response, next) => {
  let status = error.status || 500
  if (error.type === 'Validation Error') status = 400
  response.status(status).json({
    error: {
      type: error.type || 'Unknown',
      message: error.message,
      stack: error.stack,
      payload: error.payload,
    }
  });
});

export default router
