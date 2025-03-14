import HomeView from "@/views/HomeView.vue";

export default [
  {
    path: '/',
    name: 'Index',
    component: import('../views/Index.vue')
  },
  {
    path: '/base',
    name: 'Base',
    component: import('../views/Base.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
