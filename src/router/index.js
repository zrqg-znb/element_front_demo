import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '仪表盘' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('../views/table/index.vue'),
        meta: { title: '表格' }
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('../views/form/index.vue'),
        meta: { title: '表单' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router