import fetch from '@/utils/fetch'

export const loginOut = (data) => {
    return fetch('/api/system/management/common/logout', data, "POST")
}