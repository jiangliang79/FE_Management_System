import fetch from '@/utils/fetch'

export const loginOut = (data) => {
    return fetch('/api/system/management/common/logout', data, "POST")
}

export const userList = (data) => {
    return fetch('/api/system/management/user/list',data,"GET");
};

export const addUser = (data) => {
    return fetch('/api/system/management/user/add',data,"POST")
}

export const deleteUser = (data) => {
    return fetch('/api/system/management/user/delete',data,"POST")
}

export const ediPassword = (data) => {
    return fetch('/api/system/management/user/password/reset',data,"POST")
}