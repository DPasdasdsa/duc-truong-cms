export default [
  {
    path: '/login:pathMatch(.*)*',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '/drivers',
        name: 'Drivers',
        component: () => import('../views/Drivers/Index.vue'),
        meta: {
          requireLogin: true,
          breadCrumbs: [
            {
              'name': 'Drivers',
              'displayName': 'Danh sách lái xe',
            },
          ],
        }
      },
      {
        path: '/assistants',
        name: 'Assistants',
        component: () => import('../views/Assistants/Index.vue'),
        meta: {
          requireLogin: true,
          breadCrumbs: [
            {
              'name': 'Assistants',
              'displayName': 'Danh sách phụ xe',
            },
          ],
        }
      },
      {
        path: '/vehicles',
        name: 'Vehicles',
        component: () => import('../views/Vehicles/Index.vue'),
        meta: {
          requireLogin: true,
          breadCrumbs: [
            {
              'name': 'Vehicles',
              'displayName': 'Danh sách xe',
            },
          ],
        }
      },
      {
        path: '/trips',
        name: 'Trips',
        component: () => import('../views/Trips/Index.vue'),
        meta: {
          requireLogin: true,
          breadCrumbs: [
            {
              'name': 'Trips',
              'displayName': 'Danh chuyến xe trong ngày',
            },
          ],
        }
      },
      {
        path: '/assignments',
        name: 'Assignments',
        component: () => import('../views/Assignments/Schedule.vue'),
        meta: {
          requireLogin: true,
          breadCrumbs: [
            {
              'name': 'Assignments',
              'displayName': 'Lịch làm việc cho lái xe và phụ xe',
            },
          ],
        }
      },
    ]
  }
]
