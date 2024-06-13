const routes = [
    {
        path: '/recipe',
        name: 'recipe',
        component: () =>  import(/* webpackChunkName: "recipe" */ '@/views/recipe')
    },
]
export default routes;