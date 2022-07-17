import express from 'express';
import moment from 'moment';
import { Characters } from './manager/manager.js';
const Contenedor = new Characters();

const app = express();
const PORT = 8080;

let contador=0;
const server = app.listen(PORT,()=>{
    console.log(`Listening ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send("<h1>Bienvenido a Express</h1>")
})

app.get('/visitas',(req,res)=>{
    contador++
    res.send(`Hay ${contador} visitas registradas`)
})

app.get('/time',(req,res)=>{
    let currentTime=moment();
    res.send(currentTime.format('DD/MM/YYY hh:mm:ss'))
})


app.get('/productos', async (req, res) => {
    const allCharacters = await Contenedor.getAll()
    res.send(allCharacters)
})

app.get('/productoRandom', async (req, res) => {
    const allCharacters = await Contenedor.getAll()
    const randomCharacter = Math.floor(Math.random() * allCharacters.length )
    res.send(allCharacters[randomCharacter])
})  