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



module.exports = {
  obtenerChat
}