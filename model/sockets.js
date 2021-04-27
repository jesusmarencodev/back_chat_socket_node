class Sockets {
  constructor(io){
    this.io = io;
    this.socketEvents();
  }
//comentario
  socketEvents(){
    //On connection
    this.io.on('connection', ( socket ) => {
      socket.on('mensaje-to-server', (data)=>{
        console.log(data);
        this.io.emit('server-to-client', {data});
      });
    });
    
  }
}

module.exports = Sockets;