import connection from './connection';

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