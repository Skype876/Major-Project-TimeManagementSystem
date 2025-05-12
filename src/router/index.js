import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import StudentPortal from '../views/StudentPortal.vue'
import LoginPage from '../views/LoginPage.vue'
import TellerDashboard from '../views/TellerDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

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
    meta: { requiresAuth: true, roles: ['customer service rep','SUPER_ADMIN'] },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin', 'SUPER_ADMIN'] },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (to.meta.requiresAuth) {
    if (!token) {
      return { path: '/login' }
    }

    if (to.meta.roles && (!user || !to.meta.roles.includes(user))) {
      return { path: '/login' }
    }

    // Handle role-specific redirection only when navigating to non-role specific routes
    if (to.path !== '/teller' && to.path !== '/admin') {
      if (user === 'customer service rep' || user === 'SUPER_ADMIN') {
        return { path: '/teller' }
      }
      if (user !== 'customer service rep' || user === 'SUPER_ADMIN') {
        return { path: '/admin' }
      }
    }
  }
})


export default router
