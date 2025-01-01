
const routes = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'expenses',
        name: 'expenses',
        component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('pages/CategoriesPage.vue'),
      },
      {
        path: 'categories/:categoryId',
        name: 'category',
        component: () => import('pages/CategoryPage.vue'),
        props: true,
      }
    ]
  },
  
  {
    path: '/',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('pages/SignupPage.vue'),
  },

  {
    path: '/reset',
    name: 'reset',
    component: () => import('pages/ResetPassword.vue'),
  },

  {
    path: '/update-password/',
    name: 'update-password',
    component: () => import('pages/UpdatePassword.vue'),
    props: route => ({ token: route.query.token }),
  },

  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('pages/ConfirmEmail.vue'),
    props: route => ({ token: route.query.token }),
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
