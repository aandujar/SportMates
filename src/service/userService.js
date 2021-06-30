import connection from './connectionApi';

export function register(user) {
    return connection.$axios({
        url: '/user/register',
        method: 'POST',
        data: user
    })
}

export function login(params) {
    return connection.$axios({
        url: '/user/login',
        method: 'GET',
        params: params
    })
}

export function dataIsInUse(data) {
    return connection.$axios({
        url: `/user/${data.type}`,
        method: 'GET',
        params: data.params
    })
}

export function updateAvatar(data) {
    return connection.$axios({
        url: `/user/avatar/${data.userId}`,
        method: 'PUT',
        data: data.avatar
    })
}

export function changePassword(data) {
    return connection.$axios({
        url: `/user/password/${data.userId}`,
        method: 'PUT',
        data: data.password
    })
}
