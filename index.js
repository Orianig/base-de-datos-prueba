
//DECLARO LAS CONSTANTES

//importa el express
const express = require('express');
// me traigo el db
const db = require('./db');
// me requiere el router, lo que me lleva al router
const router = require('./router');
//me requiere el middleware
const auth = require('./middlewares/verifyToken');
//aqui requiero el authController
const authController = require('./controllers/authController');
//ejecutar express
const app = express();
//para concatenar
const PORT = 3000;


//DECLARO LOS APP

//para que me lea el json que viene del front
app.use(express.json());
//para gestionar todas las rutas del router
app.use(router);
//para corroborar que esta funcionando y que si hay un fallo no sea de 
//la configuracion del servidor
app.get('/health', auth, (req, res) => { //el auth lo agrego si quiero meterle el middleware, sino, no haria falta el auth
    return res.send('healthy'); //me lo muestra en postman o en la pantalla
})

// esta es la promesa, siempre va asi
db.then(() => {
    //si esto va bien se ejecuta con promesas
    //esto es para que me haga la lectura de todo
    app.listengit (PORT, () => {
        console.log('server is running on port:' + PORT);
    })
}
).catch((error) => {
    console.error('Error starting server', error.message)
})



