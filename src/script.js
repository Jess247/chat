let socket = io()

let messages = document.getElementById('messages')
let form = document.getElementById('form')
let input = document.getElementById('input')
const username = prompt('Enter your name...')

// send username to server
socket.emit('set username', username)

form.addEventListener('submit', e => {
    e.preventDefault()

    if(input.value) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
})

socket.on('chat message', msg => {
    let item = document.createElement('li')
    item.innerHTML = `<span class="messages__name">${username}</span>: <br> ${msg}`
    item.classList.add('messages__item-right')
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})
