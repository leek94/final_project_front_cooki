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
        path: '/Member/MypageView',
        name: 'Mypage',
        component: () =>  import(/* webpackChunkName: "Member" */ '@/views/Member/MypageView'),
        redirect: '/Member/MypageView/MyRecipe',
        children : [
            {
                path: 'MyRecipe',
                name: 'MyRecipe',
                component: () => import(/* webpackC`hunkName: "Member" */ '@/views/Member/MypageView/MyRecipe'),
            },
            {
                path: 'MyLikeRecipe',
                name: 'MyLikeRecipe',
                component: () => import(/* webpackC`hunkName: "Member" */ '@/views/Member/MypageView/MyLikeRecipe'),
            },
            {
                path: 'MyQAndA',
                name: 'MyQAndA',
                component: () => import(/* webpackC`hunkName: "Member" */ '@/views/Member/MypageView/MyQAndA'),
            },
            {
                path: 'MyProfile',
                name: 'MyProfile',
                component: () => import(/* webpackC`hunkName: "Member" */ '@/views/Member/MypageView/MyProfile'),
            },
        ]
    },
]
export default routes;