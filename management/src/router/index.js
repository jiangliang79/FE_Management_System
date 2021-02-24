import Vue from 'vue'
import Router from 'vue-router' // 引入vue-router

import Login from '@/view/login/Login';
Vue.use(Router) // 在vue中注入Router

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/homePage',
            name: 'homePage',
            component: () => import('@/view/homePage/HomePage.vue'),
            children: [{
                    path: '/homePage/welcome',
                    name: 'welcome',
                    component: () => import('@/components/rightContent/Welcome.vue')
                },
                {
                    path: '/homePage/userManagement',
                    name: 'userManagement',
                    component: () => import('@/components/rightContent/UserManagement.vue')
                },
                {
                    path: '/homePage/studentInfo',
                    name: 'studentInfo',
                    component: () => import('@/components/rightContent/StudentInfo.vue')
                }
            ]
        }
    ],
    mode: "history" //干掉地址栏里边的#号键
})