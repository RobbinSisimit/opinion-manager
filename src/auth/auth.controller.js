import {hash, verify} from "argon2";
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    
    const {email,password, username} = req.body;

    try {


        const user = await Usuario.findOne({
            $or: [{email},{username}]
        })

        if(!user){
            return res.status(400).json({
                msg: "Credenciales Incorrectas,El Correo No Existente En La Data Base"
            });
        }

        if(!user.estado){
            return res.status(400).json({
                msg: "El Usuario No Existe En La Base De Datos"
            }); 
        }

        const validPassword = await verify(user.password, password);
        if(!validPassword){
            return res.status(400).json({
                msg: "La Contraseña Es Incorrecta"
            })
        }

        const token = await generarJWT(user.id);
        
        res.status(200).json({
            msg: "Inicio De Sesion Exitoso!",
            userDetails: {
                username: user.username,
                token: token
            }
        })

        
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: 'Server Error',
            error: e.message
        })
    }
}

export const register  = async (req, res) => {
    try {
        const data = req.body;

        const encryptedPassword = await hash(data.password);

        const user = await Usuario.create({
            name: data.name,
            username: data.username,
            email: data.email,
            password: encryptedPassword,
            role: data.role
        })

        return res.status(201).json({
            message: "User Register Successfully",
            userDetails:{
                user: user.email
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "User Registration Failed",
            error: error.message
        })
    }
}