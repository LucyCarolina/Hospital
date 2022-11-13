import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombres:{
        type: String,
        trim: true,
        required: true,
    },
    apellidos:{
        type: String,
        trim: true,
        required: true,
    },
    edad:{
        type: Number,
        trim: true,
        required: true,
    },
    diagnostico:{
        type: String,
        trim: true,
        required: true,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now(),
    }, 
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
    ],
}, {
    timestamps: true,
});

const Paciente = mongoose.model("Paciente", pacienteSchema);
export default Paciente;