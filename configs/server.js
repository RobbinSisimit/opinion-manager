'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js'

import bcrypt from "bcrypt";
import User from "../src/users/user.model.js";
//import userRoutes from "../src/users/user.routes.js"
//import courseRoutes from "../src/courses/course.routes.js"

const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const configurarRutas = (app) =>{
        app.use("/Opiniones/v1/auth", authRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log("Conexion Exitosa Con La Base De Datos");
    } catch (error) {
        console.log("Error Al Conectar Con La Base De Datos", error);
    }
}


export const crearAdmin = async () => {
    try {
        const existeAdmin = await User.findOne({ username: "admin" });

        if (!existeAdmin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("12345678", salt);

            const admin = new User({
                name: "Admin",
                surname: "Principal",
                username: "admin",
                password: hashedPassword,
                email: "admin@gmail.com",
                role: "ADMIN_ROLE",
            });

            await admin.save();
            console.log(" Usuario ADMIN_ROLE creado con éxito.");
        } else {
            console.log(" El usuario ADMIN_ROLE ya existe.");
        }
    } catch (error) {
        console.error(" Error al crear el usuario ADMIN_ROLE:", error);
    }
};

export const iniciarServidor = async () => {
    const app = express();
    const port = process.env.PORT || 3009;

    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);

    app.listen(port, () => {
        console.log(`Server Running On Port ${port}`);
    });
}