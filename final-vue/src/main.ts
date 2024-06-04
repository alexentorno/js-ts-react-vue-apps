import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import Login from './pages/login/Login.vue';
import Register from './pages/register/Register.vue';
import Home from './pages/Home.vue';
import ContestList from './pages/contests/ContestList.vue';
import ContestTeams from './pages/contests/ContestTeamList.vue';
import ContestResults from './pages/contests/Results.vue';
import ActivateEvent from './pages/contests/ActivateEvent.vue';
import ParticipateInContest from './pages/contests/ParticipateInContest.vue';

import QrReader from 'vue3-qr-reader';


const app = createApp(App);
app.use(QrReader);

const routes = [

    { path: '/', name: 'home', component: Home },
    { path: '/contests', name: 'contests', component: ContestList },

    { path: '/contest/participate/:id', name: 'to-contest-teams', component: ContestTeams },
    { path: '/contest/activate/:id', name: 'activate-contest-team', component: ActivateEvent },
    { path: '/contest/participate/:id', name: 'participate-in-contest', component: ParticipateInContest },
    { path: '/contest/results/:id', name: 'contest-results', component: ContestResults },

    { path: '/pages/login', name: 'login', component: Login },
    { path: '/pages/register', name: 'register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')


