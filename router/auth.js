/*
  path :

*/

const {  Router  } = require('express');

const router = Router();


//Crear nuevos usuarios
router.post('/new', (req, res) => {
  res.json({ok:true})
});


//Login

router.post('/', (req, res) => {
  res.json({
    ok : true,
    msg : 'login'
  })
});


//Revalidar token

router.get('/renew', (req, res) => {
  res.json({
    ok : true,
    msg : 'renew'
  })
});


module.exports = router;