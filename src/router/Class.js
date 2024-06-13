const routes = [
    {
        path: '/Class/ClassDetail',
        name: 'ClassDetail',
        component: () =>  import(/* webpackChunkName: "Class" */ '@/views/Class/ClassDetail')
    },
    {
        path: '/Class/ClassList',
        name: 'ClassList',
        component: () =>  import(/* webpackChunkName: "Class" */ '@/views/Class/ClassList')
    },
]
export default routes;