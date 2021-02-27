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
                    component: () => import('@/view/homePage/Welcome.vue')
                },
                {
                    path: '/homePage/userManagement',
                    name: 'userManagement',
                    component: () => import('@/view/homePage//UserManagement.vue')
                },
                {
                    path: '/homePage/studentInfo',
                    name: 'studentInfo',
                    component: () => import('@/view/homePage/StudentInfo.vue')
                },
                {
                    path: '/homePage/department',
                    name: 'department',
                    component: () => import('@/view/homePage/Department.vue')
                },
                {
                    path: '/homePage/profession',
                    name: 'profession',
                    component: () => import('@/view/homePage/Profession.vue')
                },
                {
                    path: '/homePage/class',
                    name: 'class',
                    component: () => import('@/view/homePage/Class.vue')
                },
                {
                    path: '/homePage/teacherList',
                    name: 'teacherList',
                    component: () => import('@/view/homePage/Teacher.vue')
                },
                {
                    path: '/homePage/teacherClass',
                    name: 'teacherClass',
                    component: () => import('@/view/homePage/TeacherClass.vue')
                },
                {
                    path: '/homePage/fileTableManagement',
                    name: 'fileTableManagement',
                    component: () => import('@/view/homePage/FileTable.vue')
                }
            ]
        }
    ],
    mode: "history" //干掉地址栏里边的#号键
})