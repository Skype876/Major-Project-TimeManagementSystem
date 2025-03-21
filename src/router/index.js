import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import StudentPortal from '@/views/StudentPortal.vue'
import LoginPage from '@/views/LoginPage.vue'
import TellerDashboard from '@/views/TellerDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/student',
    name: 'StudentPortal',
    component: StudentPortal,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/teller',
    name: 'TellerDashboard',
    component: TellerDashboard,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
