import { Router } from "express";
import { crearCategoria, listarCategoria, ActualizarCategoria, EliminarCategoria } from "../categories/category.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarRol } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
    validarJWT,
    validarRol("ADMIN_ROLE")
    ],
    crearCategoria
);

router.get("/", listarCategoria);

router.put(
    "/:id",
    [
        validarJWT,
        validarRol("ADMIN_ROLE")
    ],
    ActualizarCategoria
);

router.delete(
    "/:id", 
    [
        validarJWT,
        validarRol("ADMIN_ROLE")
    ],
    EliminarCategoria
    );

export default router;
