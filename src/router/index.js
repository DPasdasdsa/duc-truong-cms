import {createRouter, createWebHistory} from 'vue-router'
import routes from "@/router/routes"
import middlewareAuth from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


function globalMiddleware() {
  return [middlewareAuth]
}

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({...context, next: nextMiddleware})
  }
}

router.beforeEach(async (to, from, next) => {
  let middleware = null
  let routeMiddleware = null
  if (to.meta.middleware) {
    routeMiddleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]
  }
  middleware = routeMiddleware
    ? globalMiddleware().concat(routeMiddleware)
    : globalMiddleware()
  if (middleware.length > 0) {
    const context = {to, from, next, router}
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({...context, next: nextMiddleware})
  }
  return next()
})

const originalPush = router.push
router.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }

  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err
    }

    return Promise.reject(err)
  })
}
export default router
