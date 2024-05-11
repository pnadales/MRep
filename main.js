const express = require('express');
const app = express();
const { insertar, consultar, editar, eliminar } = require('./crud')
const bodyParser = require('body-parser');


app.listen(4000, console.log("Servidor en puerto 4000"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});
app.use(bodyParser.json());

app.post("/cancion", async (req, res) => {
    try {
        const datos = Object.values(req.body);
        console.log(datos)
        const respuesta = await insertar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})

app.get("/canciones", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros)
        console.log("reg: ", registros)
    } catch (error) {
        res.status(500).send("Hubo un error :c")

    }
})

app.put("/cancion/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
        const datos = [req.params.id].concat(Object.values(req.body));
        console.log(datos)
        const respuesta = await editar(datos);
        res.json(respuesta);

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error :c")
    }
})

app.delete("/cancion", async (req, res) => {
    try {
        console.log(req.query)
        const { id } = req.query
        const respuesta = await eliminar(id);
        res.json(respuesta);
    } catch (error) {
        res.status(500).send("Hubo un error :c")
    }
})