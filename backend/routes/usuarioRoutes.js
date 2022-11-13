import express  from "express";
const router = express.Router();
import { registrar, autenticar, confirmar, recuperarContrasena, comprobarToken, nuevaContrasena, perfil } from '../controllers/usuarioController.js.js';
import checkAuth from '../middelware/checkAuth.js';


//AUTENTICACION, REGISTRO Y CONFIRMACION DE USUARIOS
router.post('/', registrar); //Crea un nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/recuperar-contrasena', recuperarContrasena);
router.route('/recuperar-contrasena/:token').get(comprobarToken).post(nuevaContrasena);

router.get('/perfil', checkAuth, perfil);


export default router;