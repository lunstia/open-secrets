const socket = io();

socket.on('chat message', () => {
    location.href = '/'
})

// allows users to keep their posts without the force refresh affecting them.

window.onbeforeunload = () => {
    if (!document.getElementById('post')) return

    sessionStorage.setItem('post', document.getElementById('post').value)
    sessionStorage.setItem('hideAuthor', document.getElementById('hideAuthor').checked)
    sessionStorage.setItem('hidePost', document.getElementById('hidePost').checked)
}

window.onload = () => {
    if (!document.getElementById('post')) return
    const main = document.querySelector('main')

    main.scrollTo(0, main.scrollHeight);
    document.getElementById('post').value = sessionStorage.getItem('post') || '' 
    document.getElementById('hideAuthor').checked = sessionStorage.getItem('hideAuthor') === 'true' ? true : false
    document.getElementById('hidePost').checked = sessionStorage.getItem('hidePost') === 'true' ? true : false
}