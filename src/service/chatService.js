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

export function updateMessage(data) {
    return connection.$axios({
        url: `/chatMessage`,
        method: 'PUT',
        data: data
    })
}

export function deleteMessage(data) {
    return connection.$axios({
        url: `/chatMessage/${data.messageId}/${data.userId}`,
        method: 'DELETE',
        data: data
    })
}