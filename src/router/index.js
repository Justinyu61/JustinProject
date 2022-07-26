import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login'
import Dashboard from '../views/Dashboard'
import Products from '../views/Products.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        component: Products
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
