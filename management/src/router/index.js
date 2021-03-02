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
                },
                {
                    path: '/homePage/teacherSendTaskRecord',
                    name: 'teacherSendTaskRecord',
                    component: () => import('@/view/homePage/TeacherSendTaskRecord.vue')
                },
                //  学生成绩评定记录
                {
                    path: '/homePage/studentScoreRecord',
                    name: 'studentScoreRecord',
                    component: () => import('@/view/homePage/StudentScoreList.vue')
                },
                {
                    path: '/homePage/fileViewDownload',
                    name: 'fileViewDownload',
                    component: () => import('@/view/homePage/FileViewDownload.vue')
                },
                {
                    path: '/homePage/checkTaskTable',
                    name: 'checkTaskTable',
                    component: () => import('@/view/homePage/CheckTaskTable.vue')
                },
                {
                    path: '/homePage/sendTask',
                    name: 'sendTask',
                    component: () => import('@/view/homePage/SendTask.vue')
                },
                {
                    path: '/homePage/personalInfo',
                    name: 'personalInfo',
                    component: () => import('@/view/homePage/PersonalInfo.vue')
                },
                {
                    path: '/homePage/studentTask',
                    name: 'studentTask',
                    component: () => import('@/view/homePage/StudentTask.vue')
                },
                {
                    path: '/homePage/teacherTaskRecord',
                    name: 'teacherTaskRecord',
                    component: () => import('@/view/homePage/TeacherTaskRecord.vue')
                },
                {
                    path: '/homePage/studentTaskWriteRecord',
                    name: 'studentTaskWriteRecord',
                    component: () => import('@/view/homePage/StudentTaskWriteRecord.vue')
                },
                {
                    path: '/homePage/scoreCheck',
                    name: '/homePage/scoreCheck',
                    component: () => import('@/view/homePage/ScoreCheck.vue')
                },
                // 成绩评定列表
                {
                    path: '/homePage/scoreCheckList',
                    name: '/homePage/scoreCheckList',
                    component: () => import('@/view/homePage/ScoreCheckList.vue')
                },
                {
                    path: '/homePage/echarts',
                    name: 'echarts',
                    component: () => import('@/view/homePage/Echarts.vue')
                }
            ]
        }
    ],
    mode: "history" //干掉地址栏里边的#号键
})