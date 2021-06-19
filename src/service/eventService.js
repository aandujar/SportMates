import connection from './connection';

export function getEvents(data) {
    return connection.$axios({
        url: '/event/all',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function getSuscriptedEvents(data) {
    return connection.$axios({
        url: '/event/suscripted',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function addUserToEvent(data) {
    return connection.$axios({
        url: `/event/${data.eventId}/${data.userId}`,
        method: 'POST'
    })
}

export function unsuscribeUserToEvent(data) {
    return connection.$axios({
        url: `/event/unsuscribe/${data.eventId}/${data.userId}`,
        method: 'DELETE'
    })
}

export function getSports() {
    return connection.$axios({
        url: `/sport`,
        method: 'GET'
    })
}

export function createEvent(data) {
    return connection.$axios({
        url: '/event',
        method: 'POST',
        data: data
    })
}
