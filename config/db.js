import mongoose from "mongoose";

const conectarDB = async () => {
    try{
        const connection = await mongoose.connect(
            "mongodb+srv://carolinamgt:mcMongo2022@cluster0.4jwgvzl.mongodb.net/hospital?retryWrites=true&w=majority",{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MongoDB Conectado en: ${url} `)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default conectarDB;