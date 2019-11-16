const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.type('html');
  fs.createReadStream('./index.html').pipe(res);
});

io.on('connection', (socket) => {
  console.log('new socket');
  socket.on('un-evenement', (val) => {
    console.log(`la valeur : ${val}`)
  });

  socket.on('click', (number) => {
    console.log(number)
    io.emit('qq1-a-clique', number);
    io.emit('qq2-a-clique', number);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

  setInterval(() => {
    socket.emit('timer', Math.round(Date.now() / 1000))
  }, 1000)
})

http.listen('8081');