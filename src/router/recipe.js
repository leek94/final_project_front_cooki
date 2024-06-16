const routes = [
    {         
        path: '/Recipe/RecipeListView',
        name: 'RecipeList',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe/RecipeListView')
    },
    {         
        path: '/Recipe/RecipeDetailView',
        name: 'RecipeDetail',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe/RecipeDetailView')
    },
    {         
        path: '/Recipe/RecipeResisterView',
        name: 'RecipeResisterView',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe/RecipeResisterView')
    },
    {         
        path: '/Recipe/RecipeUpdateView',
        name: 'RecipeUpdateView',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe/RecipeUpdateView')
    },
]
export default routes;