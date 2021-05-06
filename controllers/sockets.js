const Usuario = require('../model/usuario');


const usuarioConeactado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();

  return usuario;
}

const usuarioDesconectado = async (uid) => {
  console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();

  return usuario;
}

module.exports = {
  usuarioConeactado,
  usuarioDesconectado
}