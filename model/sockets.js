class Sockets {
  constructor(io){
    this.io = io;
    this.socketEvents();
  }
//comentario
  socketEvents(){
    //On connection
    this.io.on('connection', ( socket ) => {
      //TODO : validar JWT
      // si el token no es valido desconectar

      //TODO : saber que usuario esta activo mediante el UID


      //TODO: emitir todos los usuarios conectados


      //TODO: Socket join unir un usuario a una sala en particular


      //TODO: escuchar cuando el cliente envia un mensaje
      //mensaje personal


      //TODO : Disconnect
      //marcar en la DB que el usuario se desconecto

      //TODO: Emitir todos los usuarios conectados

    });
    
  }
}

module.exports = Sockets;