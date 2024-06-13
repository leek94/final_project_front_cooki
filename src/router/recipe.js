const routes = [
    {
        path: '/Recipe',
        name: 'Recipe',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe')
    },
]
export default routes;