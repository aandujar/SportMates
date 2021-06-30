import connection from './connectionChat';

export function getMessagesByEvent(data) {
    return connection.$axios({
        url: `/chatMessage/${data.eventId}/${data.userId}`,
        method: 'GET'
    })
}

export function addMessage(data) {
    return connection.$axios({
        url: `/chatMessage`,
        method: 'POST',
        data: data
    })
}