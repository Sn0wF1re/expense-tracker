
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/HomePage.vue') }
  //   ]
  // },

  {
    path: '/',
    component: () => import('pages/HomePage.vue'),
  },

  {
    path: '/auth',
    component: () => import('pages/AuthPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
