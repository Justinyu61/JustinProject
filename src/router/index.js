import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home'
import Login from '@/views/login/Login'
import Dashboard from '@/views/dashboard-backUser/Dashboard.vue'
import Products from '@/views/dashboard-backUser/ProductControler/Products.vue'
import Orders from '@/views/dashboard-backUser/orderConfirmation/Orders.vue'
import Discount from '@/views/dashboard-backUser/discountPage/Discount.vue'
import ProductBoard from '@/views/dashboard-frontUser/productPage/ProductBoard'
import ProductIndex from '@/views/dashboard-frontUser/productPage/ProductIndex'
import ProductItem from '@/views/dashboard-frontUser/productPage/ProductItem'
import UserCart from '@/views/dashboard-frontUser/cartPage/UserCart.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
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
    path: '/products',
    component: ProductBoard,
    children: [
      {
        path: 'productsIndex',
        component: ProductIndex
      },
      {
        path: 'product/:productId',
        component: ProductItem
      }
    ]
  },
  {
    path: '/cart',
    component: UserCart
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
