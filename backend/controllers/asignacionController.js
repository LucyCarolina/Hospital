import Paciente from  "../models/Paciente.js.js"
import Asignacion from "../models/Asignacion.js.js";

const agregarAsignacion = async (req, res) => {
    const { paciente } = (req.body);

    const existePaciente = await Paciente.findById(paciente);
    console.log(existePaciente);
    

    if(!existePaciente){
        const error  = new Error('El paciente no existe');
        return res.status(404).json({msg: error.message});
    }

    if(existePaciente.creador.toString() !== req.usuario._id.toString()){
        const error  = new Error('No tiene los permisos requeridos para esta accion');
        return res.status(403).json({msg: error.message});
    }

    try {
        const asignacionAlmacenada = await Asignacion.create(req.body);
        res.json(asignacionAlmacenada);
    } catch (error) {
        console.log(error)
    }

    
};

const obtenerAsignacion = async (req, res) => {
    const {id} = req.params;

    const asignacion = await Asignacion.findById(id).populate("paciente");

    if(!asignacion){
        const error  = new Error('Asignacion no encontrada');
        return res.status(404).json({msg: error.message});
    }

    if(asignacion.paciente.creador.toString() !== req.usuario._id.toString()){
        const error  = new Error('Accion no permitida');
        return res.status(403).json({msg: error.message});
    }

    res.json(asignacion);
};


const actualizarAsignacion = async (req, res) => {
    const {id} = req.params;

    const asignacion = await Asignacion.findById(id).populate("paciente");

    if(!asignacion){
        const error  = new Error('Asignacion no encontrada');
        return res.status(404).json({msg: error.message});
    }

    if(asignacion.paciente.creador.toString() !== req.usuario._id.toString()){
        const error  = new Error('Accion no permitida');
        return res.status(403).json({msg: error.message});
    }

    asignacion.nombreAsignacion = req.body.nombreAsignacion || asignacion.nombreAsignacion;
    asignacion.descripcion = req.body.descripcion || asignacion.descripcion;
    asignacion.prioridad = req.body.prioridad || asignacion.prioridad;
    asignacion.fechaEntrega = req.body.fechaEntrega || asignacion.fechaEntrega;

    try {
        const asignacionAlmacenada = await asignacion.save();
        res.json(asignacionAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

const eliminarAsignacion = async (req, res) => {
    const {id} = req.params;

    const asignacion = await Asignacion.findById(id).populate("paciente");

    if(!asignacion){
        const error  = new Error('Asignacion no encontrada');
        return res.status(404).json({msg: error.message});
    }

    if(asignacion.paciente.creador.toString() !== req.usuario._id.toString()){
        const error  = new Error('Accion no permitida');
        return res.status(403).json({msg: error.message});
    }

    try {
        await asignacion.deleteOne()
        res.json({ msg: 'Asignación Eliminada'})
    } catch (error) {
        console.log(error);
    }
};

const cambiarEstado = async (req, res) => {};

export {
    agregarAsignacion,
    obtenerAsignacion,
    actualizarAsignacion,
    eliminarAsignacion,
    cambiarEstado,
};