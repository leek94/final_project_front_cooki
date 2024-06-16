const routes = [
   
    {
        path: '/TotalSearchView',
        name: 'TotalSearchView',
        component: () =>  import(/* webpackChunkName: "TotalSearch" */ '@/views/TotalSearchView'),
        redirect: '/TotalSearchView/Total',
        children : [
            {
                path: 'Total',
                name: 'Total',
                component: () =>  import(/* webpackChunkName: "TotalSearch" */ '@/views/TotalSearchView/Total')
            },
            {
                path: 'ClassCompact',
                name: 'ClassCompact',
                component: () =>  import(/* webpackChunkName: "TotalSearch" */ '@/views/TotalSearchView/ClassCompact')
            },
            {
                path: 'RecipeCompact',
                name: 'RecipeCompact',
                component: () =>  import(/* webpackChunkName: "TotalSearch" */ '@/views/TotalSearchView/RecipeCompact')
            },
        ]
    },
    
]
export default routes;