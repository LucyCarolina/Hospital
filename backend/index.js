import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js.js';
import asignacionRoutes from './routes/asignacionRoutes.js.js';


const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Error de Cors"));
        }
    },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuarioRoutes );
app.use("/api/pacientes", pacienteRoutes );
app.use("/api/asignaciones", asignacionRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});