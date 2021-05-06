const { usuarioConeactado, usuarioDesconectado } = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io){
    this.io = io;
    this.socketEvents();
  }
//comentario
  socketEvents(){
    //On connection
    this.io.on('connection', async( socket ) => {

      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
      console.log(valido, "#################")
      if(!valido){
        console.log("Socket no identificado")
        return socket.disconnect();
      }
      
      console.log("$$$$$$$$$$$$$$$$$$")

      await usuarioConeactado(uid);
      console.log("cliente conectado")
      //TODO : validar JWT
      // si el token no es valido desconectar

      //TODO : saber que usuario esta activo mediante el UID


      //TODO: emitir todos los usuarios conectados


      //TODO: Socket join unir un usuario a una sala en particular


      //TODO: escuchar cuando el cliente envia un mensaje
      //mensaje personal


      //TODO : Disconnect
      socket.on('disconnect', async()=> {
        console.log("cliente desconectado", uid)
        await usuarioDesconectado(uid);
      })
      //marcar en la DB que el usuario se desconecto
      //TODO: Emitir todos los usuarios conectados

    });
    
  }
}

module.exports = Sockets;