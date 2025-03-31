export default [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/base-template',
        name: 'BaseTemplate',
        component: () => import('../views/BaseTemplate.vue')
      },
      {
        path: '/base-api',
        name: 'BaseApi',
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/BaseApi.vue')
      },
    ]
  }
]
