import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar =  async (req, res) => {
    //EVITA REGISTROS DUPLICADOS
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if(existeUsuario){
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Usuario creado correctamente, Revisa tu email para confirmar la cuenta"});
       
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {

    const {email, password} = req.body;

    //COMPROBANDO SI USUARIO EXISTE
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    //COMPROBANDO SI USUARIO ESTA CONFIRMADO
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }
    //COMPROBANDO PASSWORD
    if(await usuario.comprobarPassword(password)){
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario._id),
      });
    } else{
        console.log('Es incorrecto')
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }

};

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(403).json({msg: error.message});
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
    }
};

const recuperarContrasena = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    try {
        usuario.token = generarId()
        await usuario.save();
        res.json({msg: 'Se ha enviado un email con las instrucciones para recuperar tu cuenta'});
    } catch (error) {
        console.log(error)
    }

};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });

    if(tokenValido) {
        res.json({msg: 'Token validado exitosamente'});
    }else {
        const error = new Error('Token no pudo ser validado');
        return res.status(404).json({msg: error.message});
    }
};

const nuevaContrasena = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if(usuario) {
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json({msg: 'Restableciste tu contraseña exitosamente'});
        } catch (error) {
            console.log (error);
        }
       
    }else {
        const error = new Error('Token no pudo ser validado');
        return res.status(404).json({msg: error.message});
    }
};

const perfil = async (req, res) => {
    const {usuario} = req;

    res.json(usuario);
}; 

export { registrar, autenticar, confirmar, recuperarContrasena, comprobarToken, nuevaContrasena, perfil};