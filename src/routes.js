import inputLogin from './components/inputLogin.vue'
import dashboard from './components/dashboard.vue'
import sign_up from './components/sign_up.vue'
import error from './components/error.vue'

export const routes = [
    {path: '', component: inputLogin, name: 'login'},
    {path: '/dashboard', component: dashboard, name: 'dashboard'},
    {path: '/dashboard/sign_in', component: sign_up, name: 'sign_in'},
    {path: '/dashboard/error', component: error, name: 'error'}

    
]