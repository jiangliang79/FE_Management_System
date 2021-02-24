import Vue from 'vue'
import Router from 'vue-router' // 引入vue-router

import Login from '@/view/login/Login';
import HomePage from '@/view/homePage/HomePage.vue';
import Welcome from '@/components/rightContent/Welcome.vue';
import UserManagement from '@/components/rightContent/UserManagement.vue'
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
            component: HomePage,
            children: [{
                    path: '/homePage/welcome',
                    name: 'welcome',
                    component: Welcome,
                },
                {
                    path: '/homePage/userManagement',
                    name: 'userManagement',
                    component: UserManagement,
                }
            ]
        }
    ],
    mode: "history" //干掉地址栏里边的#号键
})