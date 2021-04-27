const { response } = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../model/usuario');


const crearUsuario = async(req, res = response) => {

  try {
    const { email } = req.body;

    //verificar que el email exista
    const existeEmail = await Usuario.findOne({email});
    console.log(existeEmail)
    if(existeEmail){
      return res.status(400).json({
        ok : false,
        msg : 'el correo ya existe' // esto debe ser un error generico
      })
    }

    //encriptar contraseña


    //Guardar en DB
    const usuario = new Usuario(req.body);
    usuario.save();


    res.json({
      usuario
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

  res.json({
    ok : true,
    msg : 'login',
    email,
    password
  });

}

const renewToken = async(req, res) => {
  res.json({
    ok : true,
    msg : 'renew'
  });
}

module.exports = {
  crearUsuario,
  login,
  renewToken
}