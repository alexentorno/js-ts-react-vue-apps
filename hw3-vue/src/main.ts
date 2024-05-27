import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
//import Home from './pages/Home.vue';
import Login from './pages/login/Login.vue';
import Register from './pages/register/Register.vue';
import Categories from './pages/categories/Categories.vue';
import Priorities from './pages/priorities/Priorities.vue';
import Tasks from './pages/tasks/Tasks.vue';
import Home from './pages/Home.vue';


const app = createApp(App)

const routes = [

    { path: '/', name: 'home', component: Home },
    { path: '/pages/categories', name: 'categories', component: Categories },
    { path: '/pages/priorities', name: 'priorities', component: Priorities },
    { path: '/pages/tasks', name: 'tasks', component: Tasks },
    { path: '/pages/login', name: 'login', component: Login },
    { path: '/pages/register', name: 'register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')


