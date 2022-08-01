import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login'
import Dashboard from '../views/dashboard-backUser/Dashboard.vue'
import Products from '../views/dashboard-backUser/ProductControler/Products.vue'
import Orders from '../views/dashboard-backUser/orderConfirmation/Orders.vue'
import Discount from '../views/dashboard-backUser/discountPage/Discount.vue'
import Userboard from '../views/dashboard-frontUser/Userboard.vue'
import UserCart from '../views/dashboard-frontUser/cartPage/UserCart.vue'

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
      },
      {
        path: 'orders',
        component: Orders
      },
      {
        path: 'discount',
        component: Discount
      }
    ]
  },
  {
    path: '/user',
    component: Userboard,
    children: [
      {
        path: 'cart',
        component: UserCart
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
