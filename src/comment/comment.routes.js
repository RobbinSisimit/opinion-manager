import { Router } from "express";
import { check } from "express-validator";
import {GuardarComentario, listarComentarios, BuscarComentar, eliminarComent, actualizarComent} from "./comment.controller.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("postId", "El ID del post es obligatorio").isMongoId(),
        check("content", "El contenido es obligatorio").not().isEmpty(),
        validarCampos
    ],
    GuardarComentario
)

router.get("/", listarComentarios)

router.get(
    "/BuscarComments/:id",
    [
        validarJWT,
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    BuscarComentar
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    actualizarComent
)


router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No Es Un ID Valido").isMongoId(),
        validarCampos
    ],
    eliminarComent
)

export default router;