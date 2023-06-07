
//me conecta-requiere a la ruta
const router = require('express').Router();
const authRoutes = require('./views/authRoutes')

// esto me define lo que voy a poner en postman, si solo pongo / seria ==> /register
// si pongo por ejemplo /auth ===> seria /auth/register para llamarla en postman
router.use('/auth', authRoutes);

module.exports = router;

