import { createRouter, createWebHistory } from 'vue-router'
import routes from "@/router/routes"
import middlewareAuth from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Global middleware array
function globalMiddleware() {
  return [middlewareAuth]
}

// Middleware handler
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

// Before each route
router.beforeEach((to, from, next) => {
  const routeMiddleware = to.meta.middleware
  const middleware = routeMiddleware
    ? globalMiddleware().concat(Array.isArray(routeMiddleware) ? routeMiddleware : [routeMiddleware])
    : globalMiddleware()

  if (middleware.length > 0) {
    const context = { to, from, next, router }
    const nextMiddleware = nextFactory(context, middleware, 1)
    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

// Enhanced router.push to handle errors
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name === 'NavigationDuplicated' || err.message.includes('Avoided redundant navigation')) {
      return err
    }
    return Promise.reject(err)
  })
}

export default router
