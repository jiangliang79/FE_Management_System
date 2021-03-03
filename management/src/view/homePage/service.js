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
// 分配班级
export const classDivid = (data) => {
    return fetch('/api/system/management/class/divide',data,"POST")
}
// 学生信息列表
export const getStudentList = (data) => {
    return fetch('/api/system/management/student/list', data, "GET")
}
// 文件列表
export const getArticleList = (data) => {
    return fetch('/api/system/management/article/list', data, "GET")
}

export const uploadFile = (data) => {
    return fetch('/api/system/management/article/upload', data, "POST")
}
// 编辑文件
export const editFile = (data) => {
    return fetch('/api/system/management/article/edit', data, "POST")
}
// 删除文件
export const deleteFile = (data) => {
    return fetch('/api/system/management/article/delete',data, "POST")
}
//预览文件
export const previewFile = (data) => {
    return fetch('/api/system/management/article/preview',data,"GET")
}
//获取老师发布任务记录
export const getSendTaskList = (data) => {
    return fetch('/api/system/management/teacher/task/release/list',data,"GET")
}
// 删除记录
export const deleteRecord = (data) => {
    return fetch('/api/system/management/record/delete', data,"POST")
}
//获取学生成绩评定记录
export const getStudentGradeList = (data) => {
    return fetch('/api/system/management/student/grade/list', data,"GET")
}
//批阅查看文件列表
export const getFileList = (data) => {
    return fetch('/api/system/management/student/task/article/list',data,"GET")
}
// 文件下载
export const fileDownLoad = (data) => {
    return fetch('/api/system/management/article/download',data,"GET")
}
//批阅实习表
export const checkTaskTable = (data) => {
    return fetch('/api/system/management/teacher/task/article/check', data,"POST")
}
//获取批阅实习表中的任务列表
export const checkList = (data) => {
    return fetch('/api/system/management/teacher/task/article/check/list', data, "GET")
}
// 发布任务中的任务列表
export const getTaskList = (data) => {
    return fetch('/api/system/management/teacher/task/article/list', data,"GET")
}
// 获取学生个人信息
export const getStudentInfo = (data) => {
    return fetch('/api/system/management/student/info',data,"GET")
}
// 编辑学生个人信息
export const editStudentInfo = (data) => {
    return fetch('/api/system/management/student/info', data, "POST")
}
// 获取学生实习表填写
export const getStudentTaskList = (data) => {
    return fetch('/api/system/management/student/article/task/list',data,"GET")
}
//上传文件
export const uploadTaskFile = (data) => {
    return fetch('/api/system/management/student/teacher/task/upload',data,"POST")
}
// 学生查看老师发布任务
export const teacherTaskRecord = (data) => {
    return fetch('/api/system/management/student/teacher/task/record',data,"GET")
}
// 获取学生实习表填写记录
export const getStudentTaskrecord = (data) => {
    return fetch('/api/system/management/student/teacher/task/write/record',data,"GET")
}
// 学生出勤率
export const getStudentAttendance = (data) => {
    return fetch('/api/system/management/get/student/attendance', data, "GET")
}
// 2.获取学生成绩情况
export const getStudentScore = (data) => {
    return fetch('/api/system/management/get/student/grade',data, "GET")
}
// 学生出勤率和成绩的关系
export const getRelation = (data) => {
    return fetch('/api/system/management/get/student/attendance/grade/relation', data,"GET")
}