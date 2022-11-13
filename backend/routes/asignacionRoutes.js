import express from "express";
import {
    agregarAsignacion,
    obtenerAsignacion,
    actualizarAsignacion,
    eliminarAsignacion,
    cambiarEstado,
} from "../controllers/asignacionController.js";
import checkAuth from "../middelware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, agregarAsignacion);
router
    .route("/:id")
    .get(checkAuth, obtenerAsignacion)
    .put(checkAuth, actualizarAsignacion)
    .delete(checkAuth, eliminarAsignacion);

router.post("/estado/:id", checkAuth, cambiarEstado);


export default router;