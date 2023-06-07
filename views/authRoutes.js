
const router = require('express').Router();
//aquie requiero la ubicacion del controlador
const authController = require('../controllers/authController')
//para importar solo el registro
//const {register} = requiere('../controllers/authController')

//CRUD

//aqui le llamo a lo que se realiza en el controlador
router.post('/register', authController.register);
router.post('/login', authController.login);
// importamos solo register
// router.post('/register', register);

module.exports = router;