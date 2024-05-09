const express = require('express');
const app = express();
const { insertar, consultar, editar, eliminar } = require('./crud')


app.listen(4000, console.log("Servidor en puerto 4000"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", async (req, res) => {
    const datos = Object.values(req.body);
    const respuesta = await insertar(datos)
})