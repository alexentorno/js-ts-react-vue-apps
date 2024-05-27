import { createRouter, createWebHistory } from 'vue-router';
import CategoryDetails from '@/pages/categories/details/Details.vue';
import CategoryEdit from '@/pages/categories/edit/Edit.vue';
import CategoryDelete from '@/pages/categories/delete/Delete.vue';

const routes = [
  {
    path: '/categories/details/:id',
    name: 'CategoryDetails',
    component: CategoryDetails
  },
  {
    path: '/categories/edit/:id',
    name: 'CategoryEdit',
    component: CategoryEdit
  },
  {
    path: '/categories/delete/:id',
    name: 'CategoryDelete',
    component: CategoryDelete
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;