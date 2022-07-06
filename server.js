// Crear un server básico agregando el cliente de Prisma
// Corre el server "node server.js" y accede a localhost:3000

const express = require ('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req,res) => {
    res.json({message: 'alive'});
});
app.listen(port,() => {
    console.log(`Listening to requests on port ${port}`);
});

// Agregando endpoint GET que regresa todos los explorers
app.get('/explorers', async (req, res) =>{  // localhost:3000/explorers
    const allExplorers= await prisma.explorer.findMany({});
    res.json(allExplorers)
})

// Agregando endpoint GET que regresa el explorer al enviar un ID por query params
// localhost:3000/explorers/1
app.get('/explorers/:id', async (req, res) => {
    const id= req.params.id;
    const explorer= await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
})