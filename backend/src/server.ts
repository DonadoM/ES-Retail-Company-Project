// src/server.ts
import { app } from "./app";

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default server; // Exportar el servidor para poder cerrarlo en pruebas
