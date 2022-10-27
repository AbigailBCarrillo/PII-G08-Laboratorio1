const express = require("express")
const app = express()

let {clientes} = require("./data")
app.use(express.json())

app.get('/',(req, res) => {
    res.send('<h1>PAGINA PRINCIPAL </h1> <a href = "/api/client">Clientes</a>')
  })

var a = ''
for (let i=1; i<clientes.length + 1; i++){
    var beta = `<a href = "/api/client/${i}">ID: ${i}</a> <br>`
    a += beta
}   
//console.log(a);

const nombre = '<h1>Eliga el ID deseado </h1>' + a
//console.log(nombre);

app.get('/api/Client',(req, res) => {
res.send(nombre)
})

app.get('/api/Client/:ClientID',(req, res) => {  // productID : parametro router
    console.log(req.params);  
    const {ClientID} = req.params
    const singleProduct = clientes.find(
      clientes => clientes.id === Number(ClientID))
    if(!singleProduct){
      return res.status(404).send('Cliente no encontrado')
    }
    res.json(singleProduct) 
  })

app.post("/api/clientes", (req, res) => {
    const {dni, apellidos, nombres, edad} = req.body
    if(!dni || !apellidos || !nombres || !edad) {
        res.status(400).send("Proveer datos");
        return
    }
    let newcliente = {
        dni,
        apellidos,
        nombres,
        edad
    }
    clientes.push(newcliente);
    res.send("Recibido")
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
