import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home'
import Login from '@/views/login/Login'
import Dashboard from '@/views/dashboard-backUser/Dashboard.vue'
import Products from '@/views/dashboard-backUser/ProductControler/Products.vue'
import Orders from '@/views/dashboard-backUser/orderConfirmation/Orders.vue'
import Discount from '@/views/dashboard-backUser/discountPage/Discount.vue'
import ProductBoard from '@/views/dashboard-frontUser/productPage/ProductBoard'
import ProductIndex from '@/views/dashboard-frontUser/productPage/ProductPage'
import ProductItem from '@/views/dashboard-frontUser/productPage/ProductItem'
import CartBoard from '@/views/dashboard-frontUser/cartPage/CartBoard.vue'
import CartPage from '@/views/dashboard-frontUser/cartPage/CartPage'
import UserCheck from '@/views/dashboard-frontUser/cartPage/UserCheck'
import FinalOrder from '@/views/dashboard-frontUser/cartPage/FinalOrder'

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
    component: CartBoard,
    children: [
      {
        path: 'cartPage',
        component: CartPage
      },
      {
        path: 'userCheck',
        component: UserCheck
      },
      {
        path: 'order/:orderId',
        component: FinalOrder
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
