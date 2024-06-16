import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Recipe from './Recipe'
import TotalSearch from './TotalSearch';
import Class from './Class';
import Member from './Member';
import test from './test';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...Recipe,
  ...TotalSearch,
  ...Class,
  ...Member,
  ...test

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
