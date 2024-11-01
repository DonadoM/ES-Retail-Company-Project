// src/config/db.ts

import mongoose from "mongoose";

/**
 * Conectar a la base de datos MongoDB.
 * @returns {Promise<void>} Promesa que se resuelve al establecer la conexión.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Intentar conectarse a MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true, // Usar el nuevo motor de descubrimiento y monitoreo
      useNewUrlParser: true, // Para analizar correctamente la URL de conexión
    } as mongoose.ConnectOptions);

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
