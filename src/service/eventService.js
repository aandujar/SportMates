import connection from './connectionApi';

export function getUnsubscriptedEvents(data) {
    return connection.$axios({
        url: '/event/unsubscripted',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function getInscriptedEvents(data) {
    return connection.$axios({
        url: '/event/inscripted',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function getOwnedEvents(data) {
    return connection.$axios({
        url: '/event/owned',
        method: 'POST',
        params: data.params,
        data: data.data
    })
}

export function inscribeToEvent(data) {
    return connection.$axios({
        url: `/event/inscribe/${data.eventId}/${data.userId}`,
        method: 'POST'
    })
}

export function unsubscribeToEvent(data) {
    return connection.$axios({
        url: `/event/unsubscribe/${data.eventId}/${data.userId}`,
        method: 'DELETE'
    })
}

export function removeEvent(data) {
    return connection.$axios({
        url: `/event/delete/${data.eventId}/${data.userId}`,
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
