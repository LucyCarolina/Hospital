import mongoose from "mongoose";

const asignacionSchema = mongoose.Schema({
    nombreAsignacion: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    estado: {
        type: Boolean,
        default: false,
    },
    fechaEntrega: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    prioridad:{
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
    }
},{
    timestamps: true
});

const Asignacion = mongoose.model("Asignacion", asignacionSchema);

export default Asignacion;