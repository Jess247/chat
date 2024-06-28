const { Socket } = require('engine.io')
const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)


app.use(express.static(path.join(__dirname, 'src')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
})

io.on('connection', socket => {
    socket.on('set username', username => {
        //socket.username = username
        console.log(username)
    })
})

io.on('connection', socket => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })


    // disconnect
    // socket.on('disconnect', () => {
    //     console.log('User disconnected')
    // })
})

server.listen(3000, () => {
    console.log('listening on *:3000')
})