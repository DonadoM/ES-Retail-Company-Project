import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`MongoDB conectado: ${conn.connection.host}`); // Mostrar host de conexión
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error en la conexión a MongoDB: ${error.message}`); // Manejo de errores
    } else {
      console.error("Error en la conexión a MongoDB:", error); // Manejo de errores
    }
    process.exit(1); // Salir del proceso si hay un error
  }
};

export default connectDB; // Exportar la función para su uso en otros módulos
