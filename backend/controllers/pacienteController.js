import Paciente from "../models/Paciente.js";
import mongoose from "mongoose"
import Asignacion from "../models/Asignacion.js";

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().populate('creador',"nombre email").where('creador').equals(req.usuario._id);
    

    res.json(pacientes);
};

const nuevoPaciente = async (req, res) => {
    const paciente = new Paciente({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        diagnostico: req.body.diagnostico,
        creador: req.usuario._id
        })
    console.log(paciente);

    try {
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error)
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id)

    if (!paciente){
        return res.status(404).json({ msg: "No Encontrado"});
    }

    if(paciente.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no permitida");
        return res.status(401).json({ msg: error.message });
    }

    const asignaciones = await Asignacion.find().where('paciente').equals(paciente._id);
    

    res.json({
        paciente,
        asignaciones,
    });
};

const editarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id)

    if (!paciente){
        return res.status(404).json({ msg: "No Encontrado"});
    }

    console.log(req.usuario._id);
    res.json(paciente);

    paciente.nombres = req.body.nombres || paciente.nombres;
    paciente.apellidos = req.body.apellidos || paciente.apellidos;
    paciente.edad = req.body.edad || paciente.edad;
    paciente.diagnostico = req.body.diagnostico || paciente.diagnostico;

    try {
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error)
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById(id)

    if (!paciente){
        return res.status(404).json({ msg: "No Encontrado"});
    }

    console.log(req.usuario._id);
    res.json(paciente);

    try {
        await paciente.deleteOne();
        res.json({ msg: "Paciente Eliminado" });
    } catch (error) {
        console.log(error)
    }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};



export {
    obtenerPacientes,
    nuevoPaciente,
    obtenerPaciente,
    editarPaciente,
    eliminarPaciente,
    agregarColaborador,
    eliminarColaborador,
};