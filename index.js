
const express = require('express');
//ejecutar express
const app = express();

//para concatenar
const PORT = 3000;

//para corroborar que esta funcionando y que si hay un fallo no sea de 
//la configuracion del servidor
app.get('/health', (req, res) => {
    return res.send('healthy');
})

//esto es para que me haga la lectura de todo
app.listen(3000, () => {
    console.log('server is running on port:' + PORT);
})