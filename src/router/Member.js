const routes = [
    {         
        path: '/Member/LoginView',
        name: 'LoginView',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/LoginView')
    },
    {         
        path: '/Member/JoinView',
        name: 'JoinView',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/JoinView')
    },
    {         
        path: '/Member/FindIdView',
        name: 'FindIdView',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/FindIdView')
    },
    {         
        path: '/Member/FindPasswordView',
        name: 'FindPasswordView',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/FindPasswordView')
    },
    {         
        path: '/Member/MypageView',
        name: 'Mypage',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView'),
        redirect: '/Member/MypageView/MyRecipe',
        children : [
            {
                path: 'MyRecipe',
                name: 'MyRecipe',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyRecipe'),
            },
            {
                path: 'MyLikeRecipe',
                name: 'MyLikeRecipe',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyLikeRecipe'),
            },
            {
                path: 'MyQAndA',
                name: 'MyQAndA',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyQAndA'),
            },
            {
                path: 'MyProfile',
                name: 'MyProfile',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyProfile'),
            },
            {
                path: 'MyClassHistory',
                name: 'MyClassHistory',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyClassHistory'),
            },
            {
                path: 'MyNowClass',
                name: 'MyNowClass',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/MyNowClass'),
            },
            {
                path: 'EditorRecruitHistory',
                name: 'EditorRecruitHistory',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/EditorRecruitHistory'),
            },
            {
                path: 'EditorNowRecruit',
                name: 'EditorNowRecruit',
                component: () => import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView/EditorNowRecruit'),
            },
            
        ]
    },
]
export default routes;