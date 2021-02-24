import fetch from '@/utils/fetch'

export const userList = (data) => {
    return fetch(
        `/api/system/management/user/list`,
        data,
        "GET"
    );
};

export const deleteUser = (data) => {
    return fetch('/api/system/management/user/delete',data,"POST")
}