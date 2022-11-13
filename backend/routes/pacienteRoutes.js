import express from 'express';
import {
    obtenerPacientes,
    nuevoPaciente,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente,
    agregarColaborador,
    eliminarColaborador,
} from "../controllers/pacienteController.js";
import checkAuth from "../middelware/checkAuth.js";

const router = express.Router();


router
    .route("/")
    .get(checkAuth, obtenerPacientes)
    .post(checkAuth, nuevoPaciente);

router
    .route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, editarPaciente)
    .delete(checkAuth, eliminarPaciente);


router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);

export default router;