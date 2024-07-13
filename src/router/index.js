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
  scrollBehavior(to, from, savedPosition){
    
    const classDetailParentPath = '/Class/ClassDetailView'
    const keepScrollRoutes =[
                              '/Class/ClassDetailView/CreatorInfo', 
                              '/Class/ClassDetailView/Curriculum', 
                              '/Class/ClassDetailView/QAndA',
                              '/Class/ClassDetailView/Review'
                            ];

    const isKeepScrollRoute = to.matched.some(record => keepScrollRoutes.includes(record.path));

    const isNavigatingToParentFromOtherPage = from.matched.every(record => record.path !== classDetailParentPath) &&
    to.matched.some(record => record.path === classDetailParentPath);

    if (isKeepScrollRoute && !isNavigatingToParentFromOtherPage) {
      return savedPosition;
    }

    return {top: 0, behavior:'instant'};
  }
})
export default router
