import app from "./src/app.js";

// Definir el puerto en el que se ejecutará el servidor
const PORT = 4500;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}/employees`);
});
