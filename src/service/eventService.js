import connection from './connection';

export function getEvents(data) {
    return connection.$axios({
        url: '/event',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function getCombo() {
    return connection.$axios({
        url: '/event/combo',
        method: 'GET'
    })
}

export function addUserToEvent(data) {
    return connection.$axios({
        url: `/event/${data.eventId}/${data.userId}`,
        method: 'POST'
    })
}
