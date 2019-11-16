const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


//connexion des utilisateurs

io.on('connection', (socket) => {
  const User = {
    socket,
    info: {
      id: 10,
      pseudo: 'Anonyme',
    }
  }
  //ajout d'un nouvell user
  users.push(user)


  //on recup ces infos
  socket.on('listConnectedPlayers', () => {
    socket.emit('connectedPlayers', users.map((u) => u.info))
  })

//select player
  socket.on('selectPlayer', (id) => {
    const ennemyUser = users.find(u => u.info.id === id);
    const battleRoomName = `battle-${ennemyUser.info.id}:${user.info.id}`
    ennemyUser.socket.join(battleRoomName)
    socket.join(battleRoomName)


    io.to(battleRoomName).emit('battle', {
      players: [ennemyUser.info, user.info],
      

    })
    socket.leave(battleRoomName)
  })


  
//deconnexion
  socket.on('disconnect', () => {
    users.splice(users.indexOf(user), 1);
  })
})