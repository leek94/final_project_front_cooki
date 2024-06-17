const routes = [
    {
        path: '/Class/ClassDetailView',
        name: 'ClassDetail',
        component: () => import(/* webpackC`hunkName: "Class" */ '@/views/Class/ClassDetailView'),
        redirect: '/Class/ClassDetailView/Curriculum',
        children : [
            {
                path: 'CreatorInfo',
                name: 'CreatorInfo',
                component: () => import(/* webpackChunkName: "Class" */ '@/views/Class/ClassDetailView/CreatorInfo'),
            },
            {
                path: 'Curriculum',
                name: 'Curriculum',
                component: () => import(/* webpackChunkName: "Class" */ '@/views/Class/ClassDetailView/Curriculum'),
            },
            {
                path: 'QAndA',
                name: 'QAndA',
                component: () => import(/* webpackChunkName: "Class" */ '@/views/Class/ClassDetailView/QAndA'),
            },
            {
                path: 'Review',
                name: 'Review',

                component: () => import(/* webpackChunkName: "Class" */ '@/views/Class/ClassDetailView/Review'),
            },

        ]
    },    
    {         
        path: '/Class/ClassListView',
        name: 'ClassList',
        component: () =>  import(/* webpackChunkName: "Class" */ '@/views/Class/ClassListView')
    },
    {         
        path: '/Class/ClassResisterView',
        name: 'ClassResisterView',
        component: () =>  import(/* webpackChunkName: "Class" */ '@/views/Class/ClassResisterView')
    },
    {         
        path: '/Class/ClassUpdateView',
        name: 'ClassUpdateView',
        component: () =>  import(/* webpackChunkName: "Class" */ '@/views/Class/ClassUpdateView')
    },
]
export default routes;