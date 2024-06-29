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
        const msgData = {
            username: username,
            message: input.value
        }
        socket.emit('chat message', msgData)

        messages.lastChild.scrollIntoView({ behavior: 'smooth' })
    }
})

socket.on('chat message', msg => {
    let item = document.createElement('li')
    item.innerHTML = `<span class="messages__name">${msg.username}</span> <br> ${msg.message}`
    item.className = msg.username === username ? 'messages__item-sent' : 'messages__item-received'
    messages.appendChild(item)
    item.scrollIntoView({ behavior: 'smooth' })
    input.value = ''
})
