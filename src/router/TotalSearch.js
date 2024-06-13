const routes = [
    {
        path: '/TotalSearchView',
        name: 'TotalSearchView',
        component: () =>  import(/* webpackChunkName: "TotalSearch" */ '@/views/TotalSearchView')
    },
]
export default routes;