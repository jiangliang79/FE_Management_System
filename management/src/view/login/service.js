import fetch from '@/utils/fetch'

export const login = (data) => {
    fetch('/api/system/management/common/login', data, "POST")
}

// export const register = (data) => {
//     // fetch('')
// }