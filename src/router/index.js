import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Recipe from './Recipe';
import TotalSearch from './TotalSearch';
import Class from './Class';
import Member from './Member';


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


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return {top: 0, behavior:'instant'};
  }
})
export default router
