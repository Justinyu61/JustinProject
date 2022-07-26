import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/Login'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
    // component: () => import('../views/login/Login.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
