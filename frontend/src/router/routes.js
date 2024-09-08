
const routes = [
  {
    path: '/expenses',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') }
    ]
  },

  {
    path: '/categories',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/CategoriesPage.vue')
      }
    ],
  },

  {
    path: '/',
    component: () => import('pages/SignupPage.vue'),
  },

  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },

  // {
  //   path: '/home',
  //   component: () => import('pages/HomePage.vue'),
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
