
const express = require('express');
// me traigo el db
const db = require('./db');
//ejecutar express
const app = express();

//para concatenar
const PORT = 3000;

//para corroborar que esta funcionando y que si hay un fallo no sea de 
//la configuracion del servidor
app.get('/health', (req, res) => {
    return res.send('healthy');
})

db.then(() => {
    //si esto va bien se ejecuta con promesas
    //esto es para que me haga la lectura de todo
    app.listen(PORT, () => {
        console.log('server is running on port:' + PORT);
    })
}
).catch((error) => {
    console.error('Error starting server', error.message)
})



