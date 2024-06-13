import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import recipe from './recipe';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...recipe

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
