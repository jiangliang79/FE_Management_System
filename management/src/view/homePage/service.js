import fetch from '@/utils/fetch'
// 退出登陆
export const loginOut = (data) => {
    return fetch('/api/system/management/common/logout', data, "POST")
}
//2.获取用户列表
export const userList = (data) => {
    return fetch('/api/system/management/user/list',data,"GET");
};
// 添加用户
export const addUser = (data) => {
    return fetch('/api/system/management/user/add',data,"POST")
}
//3.删除用户接口
export const deleteUser = (data) => {
    return fetch('/api/system/management/user/delete',data,"POST")
}
// 重置密码
export const ediPassword = (data) => {
    return fetch('/api/system/management/user/password/reset',data,"POST")
}
//4.获取学院列表
export const getCollegeList = (data) => {
    return fetch('/api/system/management/college/list',data, "GET")
}

// 9.删除学院、专业、班级
export const deleteOrganization = (data) => {
    return fetch('/api/system/management/organization/delete',data, "POST")
}

// 获取专业列表
export const getProfessionList = (data) => {
    return fetch('/api/system/management/profession/list',data, "GET")
}
// 添加或编辑专业
export const addProfession = (data) => {
    return fetch('/api/system/management/profession/add', data, "POST")
}
// 获取班级列表
export const getClassList = (data) => {
    return fetch('/api/system/management/class/list',data, "GET")
}
 // 添加或编辑班级
export const addClass = (data) => {
    return fetch('/api/system/management/class/add', data, "POST")
}
//获取老师信息列表
export const getTeacherList = (data) => {
    return fetch('/api/system/management/teacher/list',data, "GET")
}
// 获取老师管理的班级列表
export const getTeacherClassList = (data) => {
    return fetch('/api/system/management/teacher/class/list',data, "GET")
}
//12.删除老师管理的班级信息
export const deleteTeacherClass = (data) => {
    return fetch('/api/system/management/teacher/class/delete',data, "POST")
}

export const classDivid = (data) => {
    return fetch('/api/system/management/class/divide',data,"POST")
}