import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
//import Home from './pages/Home.vue';
import Login from './pages/login/Login.vue';
import Register from './pages/register/Register.vue';
// import Categories from './pages/categories/Categories.vue';
// import Priorities from './pages/priorities/Priorities.vue';
// import Tasks from './pages/tasks/Tasks.vue';
import Home from './pages/Home.vue';
import ContestList from './pages/contests/ContestList.vue';

// import CreateCategory from './pages/categories/create/Create.vue';
// import CategoryDetails from './pages/categories/details/Details.vue';
// import CategoryEdit from './pages/categories/edit/Edit.vue';
// import CategoryDelete from './pages/categories/delete/Delete.vue';

// import CreatePriority from './pages/priorities/create/Create.vue';
// import PriorityDetails from './pages/priorities/details/Details.vue';
// import PriorityEdit from './pages/priorities/edit/Edit.vue';
// import PriorityDelete from './pages/priorities/delete/Delete.vue';

// import CreateTask from './pages/tasks/create/Create.vue';
// import TaskDetails from './pages/tasks/details/Details.vue';
// import TaskEdit from './pages/tasks/edit/Edit.vue';
// import TaskDelete from './pages/tasks/delete/Delete.vue';


const app = createApp(App)

const routes = [

    { path: '/', name: 'home', component: Home },
    { path: '/contests', name: 'contests', component: ContestList },

    // { path: '/pages/categories', name: 'categories', component: Categories },
    // { path: '/pages/categories/create', name: 'create-category', component: CreateCategory },
    // { path: '/pages/categories/details/:id', name: 'category-details', component: CategoryDetails },
    // { path: '/pages/categories/edit/:id', name: 'edit-category', component: CategoryEdit },
    // { path: '/pages/categories/delete/:id', name: 'delete-category', component: CategoryDelete },

    // { path: '/pages/priorities', name: 'priorities', component: Priorities },
    // { path: '/pages/priorities/create', name: 'create-priority', component: CreatePriority },
    // { path: '/pages/priorities/details/:id', name: 'priority-details', component: PriorityDetails },
    // { path: '/pages/priorities/edit/:id', name: 'edit-priority', component: PriorityEdit },
    // { path: '/pages/priorities/delete/:id', name: 'delete-priority', component: PriorityDelete },

    // { path: '/pages/tasks', name: 'tasks', component: Tasks },
    // { path: '/pages/tasks/create', name: 'create-task', component: CreateTask },
    // { path: '/pages/tasks/details/:id', name: 'task-details', component: TaskDetails },
    // { path: '/pages/tasks/edit/:id', name: 'edit-task', component: TaskEdit },
    // { path: '/pages/tasks/delete/:id', name: 'delete-task', component: TaskDelete },

    { path: '/pages/login', name: 'login', component: Login },
    { path: '/pages/register', name: 'register', component: Register },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')


