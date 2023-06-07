
//me conecta-requiere a la ruta
const router = require('express').Router();
const authRoutes = require('./views/authRoutes')
const bookRoutes = require('./views/bookRoutes')

// esto me define lo que voy a poner en postman, si solo pongo / seria ==> /register
// si pongo por ejemplo /auth ===> seria /auth/register para llamarla en postman
router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

module.exports = router;

