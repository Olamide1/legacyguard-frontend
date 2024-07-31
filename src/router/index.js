import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/pages/Home.vue')
const Login = () => import('@/pages/Login.vue')
const Register = () => import('@/pages/Register.vue')
const DigitalAssets = () => import('@/pages/DigitalAssets.vue')
const DigitalWills = () => import('@/pages/DigitalWills.vue')
const Dashboard = () => import('@/pages/Dashboard.vue')
const Analytics = () => import('@/pages/Analytics.vue')
const EmergencyContacts = () => import('@/pages/EmergencyContacts.vue')
const AuditLogs = () => import('@/pages/AuditLogs.vue')
const Onboarding = () => import('@/pages/Onboarding.vue')
const EditTrustedContacts = () => import('@/pages/EditTrustedContacts.vue')
const EditEmergencyAccessConditions = () => import('@/pages/EditEmergencyAccessConditions.vue')



const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/assets', name: 'DigitalAssets', component: DigitalAssets, meta: { requiresAuth: true } },
  { path: '/wills', name: 'DigitalWills', component: DigitalWills, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/analytics', name: 'Analytics', component: Analytics, meta: { requiresAuth: true } },
  { path: '/emergency-contacts', name: 'EmergencyContacts', component: EmergencyContacts, meta: { requiresAuth: true } },
  { path: '/audit-logs', name: 'AuditLogs', component: AuditLogs, meta: { requiresAuth: true } },
  { path: '/onboarding', name: 'Onboarding', component: Onboarding, meta: { requiresAuth: true } },
  { path: '/edit-trusted-contacts', name: 'EditTrustedContacts', component: EditTrustedContacts, meta: { requiresAuth: true } },
  { path: '/edit-emergency-access-conditions', name: 'EditEmergencyAccessConditions', component: EditEmergencyAccessConditions, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
