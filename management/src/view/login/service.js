import fetch from '@/utils/fetch'

export const login = (data) => {
    return fetch('/api/system/management/common/login', data, "POST")
}

export const register = (data) => {
    return fetch('/api/system/management/common/register', data, "POST")
}