const { grabarMensaje } = require("../controllers/mensajes");
const { usuarioConeactado, usuarioDesconectado, getUsuarios } = require("../controllers/sockets");
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
      if(!valido){
        console.log("Socket no identificado")
        return socket.disconnect();
      }
    

      await usuarioConeactado(uid);
      console.log("cliente conectado")


      //unir al usuario a una sala de socket io
      socket.join(uid);


      //TODO : validar JWT
      // si el token no es valido desconectar

      //TODO : saber que usuario esta activo mediante el UID


      //TODO: emitir todos los usuarios a tosos los usuarios conectados incluido el que se conecto

      this.io.emit('lista-usuarios', await getUsuarios());


      //TODO: Socket join unir un usuario a una sala en particular


      //TODO: escuchar cuando el cliente envia un mensaje
      socket.on('mensaje-personal', async(payload)=> {
        const mensaje = await grabarMensaje(payload);
        this.io.to(payload.para).emit('mensaje-personal', mensaje);
        this.io.to(payload.de).emit('mensaje-personal', mensaje);
      })
      //mensaje personal


      //TODO : Disconnect
      socket.on('disconnect', async()=> {
        console.log("cliente desconectado", uid)
        await usuarioDesconectado(uid);
        this.io.emit('lista-usuarios', await getUsuarios());
      })
      //marcar en la DB que el usuario se desconecto
      //TODO: Emitir todos los usuarios conectados

    });
    
  }
}

module.exports = Sockets;