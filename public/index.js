const socket = io();

socket.on('chat message', () => {
    location.href = '/'
})