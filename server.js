import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

const app = express()

//1. create server using http
const server = http.createServer(app)

//2. create socket server
const io = new Server(server,{
    cors: {
        origin: '*',
        methods:["GET","POST"]
    }
});

//3. User socket events.
io.on('connection',(socket)=>{
    console.log("Connection is established");
    socket.on("join",(data)=>{
        socket.username= data
    })

    socket.on('new_message', (message)=>{

        let userMessage = {
            username: socket.username,
            message: message
        }
        //broadcast this message to all clients
        socket.broadcast.emit('broadcast_message',userMessage)

    })
    socket.on('disconnect',()=>{
        console.log('Connection is disconnected');
        
    })
})


server.listen(3000,()=>{
    console.log('App is listinging on 3000');
    
})