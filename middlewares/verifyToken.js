const jwt = require('jsonwebtoken');

//aqui debo agregar el next que implica un puedes continuar
const auth = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        //si coincide el token en el postman
        if (!bearerToken) {
            return res.json(
                {
                    succes: true,
                    message: "no puedes pasar"
                }
            )
        }

        //me separa el barer y el token y se queda la segunda parte
        const token = bearerToken.split(" ")[1];

        //decodifica el token
        const decoded = jwt.verify(token, 'secreto'); // recordar poner la clave del token

        //decodifica los elementos que se encuentran aqui
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        //avanza (me los muestra previamente o puedo hacer un console.log)
        next();
    } catch (error) { //si no es correcto me devuelve este error
        return res.status(500).json(
            {
                success: false,
                message: "Token Invalid",
                error: error
            }
        )
    }
}

module.exports = auth;