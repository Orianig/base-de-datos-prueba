
//me llama al use en models
const { User } = require('../models');
//para encriptar
const bcrypt = require('bcrypt');
//llamada inicial al authController
const authController = {};
//llamada al verifyToken
const jwt = require('jsonwebtoken');

//para crear nuevo usuario
authController.register = async (req, res) => {
    try {
        //veo por terminal lo que viene de postman 
        console.log(req.body);
        //esto es para la longitud de la password y que asi empiece el encriptado
        if (req.body.password.length < 4) {
            return res.send('Password must be longer than 4 characters');
        }
        // para encriptar la password ==> (en donde se encuentra el dato de lo que se cambia, la longitud)
        const newPassword = bcrypt.hashSync(req.body.password, 8);
        //para guardar el usuario
        const newUser = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: newPassword, //agrego aca la constante de la password encriptada
                role_id: 1
            }
        );
        //veo en postman que estan conectados
        //return res.send('Create user');
        return res.send(newUser);
    } catch (error) {
        return res.send('Something went wrong creating users ' + error.message)
    }
}

//para generar el login del usuario
authController.login = async (req, res) => {
    try {
        //especifico que me traiga en email y la password
        const { email, password } = req.body;
        //otra forma de escribirlo es esta
        // const email = req.body.email;
        // const password = req.body.password;

        //para que consiga solo una coincidencia ya que no quiero correos repetidos
        const user = await User.findOne(
            {//le especifico el valor, donde este email busco email
                where: {
                    email: email
                }
            }
        );
//si no lo consigue no se puede logear ya que no esta registrado
        if (!user) {
            //lo hago como un objeto para ayudar a que el front lo consiga mejor y 
            //generar diversos elementos que respondan al usuario
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        }

        //Validamos password
        //los puedo hacer como una validacion conjunta email y password
        const isMatch = bcrypt.compareSync(password, user.password); // true      

        if (!isMatch) {
            return res.json(
                {
                    success: true,
                    message: "Wrong credentials"
                }
            )
        }
//me lo traigo desde el middlewares/verifyToken
        const token = jwt.sign( //esto es para la firma-validacion del token
            {
                userId: user.id,
                roleId: user.role_id,
                email: user.email
            },
            'secreto', //la clave que especifica mi token
            {
                expiresIn: '3h' //otro comando, me declara el tiempo que esta valido el token
                //puede ir o no en dependencia de lo que busco
            }
        );
//lo que me va a dar en el postman
        return res.json(
            {
                success: true,
                message: "User Logged",
                token: token
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "user cant be logged",
                error: error
            }
        )
    }
}

module.exports = authController