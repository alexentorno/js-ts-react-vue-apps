import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Items from '@/views/Items.vue'
import CreateItem from '@/views/CreateItem.vue'
import EditItem from '@/views/EditItem.vue'
import DeleteItem from '@/views/DeleteItem.vue'
import DetailsItem from '@/views/DetailsItem.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/items', name: 'items', component: Items },
  { path: '/items/create', name: 'createItem', component: CreateItem },
  { path: '/items/edit/:id', name: 'editItem', component: EditItem },
  { path: '/items/delete/:id', name: 'deleteItem', component: DeleteItem },
  { path: '/items/details/:id', name: 'detailsItem', component: DetailsItem },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
