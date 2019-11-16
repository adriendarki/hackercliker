 const bodyParser = require("body-parser");
 const cors = require("cors");
 const port = 8080;
 const app = require('express')();
 const server = require('http').Server(app);
 const io = require('socket.io')(server);
 const socketFunctions = require('./functions/socket');
 const db = require('./db');

// // HOW TO USE
// // getUserToRaid (database, userId, Array_of_connected_users, [..difficulty = 5])
// // return => Integer, id a raid
// // socketFunctions.getUserToRaid(db, 1, [0, 17, 13]).then((id) => {console.log('id to raid', id);});
// //
// // getInfoForCombatStart (database, attaquerId, defenderId)
// // return => [{attckerInfos}, {defenderInfos}]
// // socketFunctions.getInfoForCombatStart(db, 1, 2).then((datas) => {console.log(datas);});




app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(require('./routes'));
app.use(require('./middlewares/notFound'))
app.use(require('./middlewares/error'))


// ///////////////socket.io
server.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



 const users=[]

io.on('connection', (socket) => {
  // socket.join('chatroom1');

  // console.log('User joined chat room 1');
  
  // var roster = io.sockets.clients('chatroom1');
  
  // roster.forEach(function(client) {
  //     console.log('id ' + user.id);
  // });
  // socket.join('room 237', () => {
  //   let rooms = Object.keys(socket.rooms);
  //   console.log(rooms); // [ <socket.id>, 'room 237' ]
  //   io.to('room 237').emit('a new user has joined the room');
  

  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log("user connecter ");
   console.log(users);
  });
  



 
  const user = {
    socket,
    info: {
      id: socket.id,
      // TODO 
      pseudo: 'Anonyme',
      niveau:0,
      attaque:1,
      defense:10,
    }

  }
  
  // recup des ip a chauqe nouvelle user
  users.push(user.info.id)
  //console.log("ajout d'un nouvel user")
  // on recup ces infos
  socket.emit('connectedPlayers', users.map((u) => u.info))



// socket.on ('getInfo', function(username){
//   console.log(info);
// })

  // select player
  socket.on('selectPlayer', (id) => {
    const ennemyUser = users.find(u => u.info.id === id);
    const battleRoomName = `battle-${ennemyUser.info.id}:${user.info.id}`
    ennemyUser.socket.join(battleRoomName)
    socket.join(battleRoomName)

  })
      
  function toBattle(battleRoomName, ennemyUser, user){
    io.to(battleRoomName).emit('battle', {
      players: [ennemyUser.info, user.info],
      
    })
  }
  
  function leaveBattle(battleRoomName, socket){
    socket.leave(battleRoomName)
  }

  // deconnexion de l'user
  socket.on('disconnect', function () {
    users.splice(users.indexOf(user), 1);
    socket.emit('connectedPlayers', users.map((u) => u.info))
  })


 })


