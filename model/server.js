//Serrvidor express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT || 8080;

    //Conectar a DB
    dbConnection();

    //Http Server express
    this.server = http.createServer(this.app);

    //configuracion del socket server
    this.io = socketIo( this.server, { /* Configuraciones */ } );
  }

  middlewares(){
    //desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //Cors
    this.app.use(cors());

    //PARSEO DEL BODY
    this.app.use( express.json() );

    //API ENDPOINTS
    this.app.use('/api/login',    require('../router/auth'));
    this.app.use('/api/mensajes', require('../router/mensajes'));
  }

  configurationSockets(){
    new Sockets(this.io);
  }


  execute(){

    //inicializar middlewares
    this.middlewares();

    //inicializar sockets
    this.configurationSockets();

    //inicializar server
    this.server.listen(this.port, ()=>{
      console.log("server corriendo en puerto: ", this.port);
    });
  }



}

module.exports = Server;