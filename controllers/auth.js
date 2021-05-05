const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../model/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {

  try {
    const { email, password } = req.body;

    //verificar que el email exista
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
      return res.status(400).json({
        ok : false,
        msg : 'el correo ya existe' // esto debe ser un error generico
      })
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(  password, salt );


    //Guardar en DB
    usuario.save();


    //generar JWT
    const token = await generarJWT(usuario.id)


    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      mgs : 'hable con el adminsitrador'
    })
  }


}

const login = async(req, res) => {

  const { email, password  } = req.body;
  
  try {
    const usuarioDB = await Usuario.findOne({email});

    if(!usuarioDB){
      return res.status(404).json({
        ok:false,
        msg:"Email no encontrado",
      })
    }

    //validar el password

    const validPassword = bcrypt.compareSync( password, usuarioDB.password );

    if(!validPassword){
      return res.status(400).json({
        ok : false,
        msg : 'password incorrecto esto es una prueba esto no debe colocarse',
      })
    }

    //generar el jwt
    const token = await generarJWT( usuarioDB.id );

    res.json({
      ok : true,
      token,
      usuario : usuarioDB
    });

    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      mgs : 'hable con el adminsitrador'
    });
  }


}

const renewToken = async(req, res) => {

  const { uid } = req;
  //generar nuevo jwt 
  const token = await generarJWT(uid);
  //info de usuario
  const usuario = await Usuario.findById(uid);

  res.json({
    ok : true,
    usuario,
    token,
  });
}

module.exports = {
  crearUsuario,
  login,
  renewToken
}