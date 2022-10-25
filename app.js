const express = require("express")
const app = express()

let {clientes} = require("./data")
app.use(express.json())

app.get("/api/clientes", (req, res) => {
    res.status(200).json({ success: true, data: clientes})
})

app.post("/api/clientes", (req, res) => {
    const {dni} = req.body
    const {apellidos} = req.body
    const {nombres} = req.body
    const {edad} = req.body
    if(!dni) {
        return res
            .status(400)
            .json({ success:false, msg: "Proveer DNI"})
    }
    res.status(201).send( {success: true, data: [...clientes, dni]})
    if(!apellidos) {
        return res
            .status(400)
            .json({ success:false, msg: "Proveer apellidos"})
    }
    res.status(201).send( {success: true, data: [...clientes, apellidos]})
    if(!nombres) {
        return res
            .status(400)
            .json({ success:false, msg: "Proveer nombres"})
    }
    res.status(201).send( {success: true, data: [...clientes, nombres]})
    if(!edad) {
        return res
            .status(400)
            .json({ success:false, msg: "Proveer edad"})
    }
    res.status(201).send( {success: true, data: [...clientes, edad]})
})

app.put("/api/clientes/:id", (req, res) => {
    const {id} = req.params
    const {dni} = req.body
    const {apellidos} = req.body
    const {nombres} = req.body
    const {edad} = req.body
    const cliente = clientes.find((cliente) => cliente.id === Number(id))
    if(!cliente) {
        return res
            .status(404)
            .json({ success: false, msg: `no existe la persona con id: ${id}`})
    }
    const newClientes = clientes.map(cliente => {
        if (cliente.id === Number(id)) {
            cliente.dni = dni
            cliente.apellidos = apellidos
            cliente.nombres = nombres
            cliente.edad = edad
        }
        return cliente
        })
        res.status(201).send( { success: true, data: newClientes})
})

app.delete('/api/clientes/:id', (req, res) => {
    const {id}=req.params
    const cliente = clientes.find((cliente) => cliente.id === Number(id))
    if (!cliente){
        return res
        .status (404)
        .json({success: false, msg: `no persona con id: ${id}`})
    }
    const newClientes = clientes.filter(cliente => cliente.id !== Number(id))
    return res.status(201).send( {success: true, data: newClientes})
})
app.listen(5100, () => {
    console.log("Server está en el puerto 5100")
    })
