const routes = [
    {
        path: '/recipe/recipeshareboardView',
        name: 'Exam01View',
        component: () =>  import(/* webpackChunkName: "recipe" */ '@/views/recipe/recipeshareboardView.vue')
    },
]
export default routes;