import inputLogin from './components/inputLogin.vue'
import dashboard from './components/dashboard.vue'

export const routes = [
    {path: '', component: inputLogin, name: 'login'},
    {path: '/dashboard', component: dashboard, name: 'dashboard'}
    
]