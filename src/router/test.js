const routes = [
    {         
        path: '/Recipe/SwiperTest2',
        name: 'SwiperTest',
        component: () =>  import(/* webpackChunkName: "Recipe" */ '@/views/Recipe/SwiperTest2')
    },
]
export default routes;