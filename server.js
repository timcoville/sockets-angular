const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const SocketIO = require('socket.io');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './dist/ang-sockets')));

app.get('*', (req, res)=> {
    res.sendFile(express.static(path.join(__dirname, './dist/ang-sockets/index.html')));
});

const server = http.createServer(app);

const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log("User Connected", socket.conn.id);
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' });
    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
      });
      
    socket.on('message', (data)=>{
        console.log(data)
        io.emit('updateall', data.msg + " from: " + data.id);
    });
    socket.on('disconnect', () => {
        console.log("User Disconnected", socket.conn.id);
    })
});

server.listen(port, ()=>{
    console.log('Server running on Port 3000');
});