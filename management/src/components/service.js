import fetch from '@/utils/fetch'

export const userList = (data) => {
    return fetch(
        `/api/system/management/user/list`,
        data,
        "GET"
    );
};