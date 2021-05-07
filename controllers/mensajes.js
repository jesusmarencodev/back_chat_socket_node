const Mensaje = require("../model/mensaje");



const obtenerChat = async(req, res) => {
  const miId = req.uid;
  const mensajeDe = req.params.de;

  const last30 = await Mensaje.find({
    $or : [
      { de: miId,      para : mensajeDe },
      { de: mensajeDe, para : miId      }
    ]
  })
  .sort({createAt : 'desc'})
  .limit(30)

  return res.json({
    ok : true,
    miId,
    last30
  });
}

const grabarMensaje = async (payload) => {

  try {
    const mensaje = new Mensaje(payload);

    await mensaje.save();

    return mensaje;

  } catch (error) {
    console.log(error)
    return false;
  }

  return usuarios;
}




module.exports = {
  obtenerChat,
  grabarMensaje
}