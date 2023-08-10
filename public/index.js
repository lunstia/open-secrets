const socket = io();

socket.on('chat message', () => {
    location.href = '/'
})

window.onbeforeunload = () => {
    if (!document.getElementById('post')) return // since if post doesnt exist, the others cant

    sessionStorage.setItem('post', document.getElementById('post').value)
    sessionStorage.setItem('hideAuthor', document.getElementById('hideAuthor').checked)
    sessionStorage.setItem('hidePost', document.getElementById('hidePost').checked)
}

window.onload = () => {
    if (!document.getElementById('post')) return // since if post doesnt exist, the others cant

    document.getElementById('post').value = sessionStorage.getItem('post') || '' 
    document.getElementById('hideAuthor').checked = sessionStorage.getItem('hideAuthor') === 'true' ? true : false
    document.getElementById('hidePost').checked = sessionStorage.getItem('hidePost') === 'true' ? true : false
}