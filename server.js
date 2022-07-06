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

// localhost:3000/explorers2
app.get('/explorers2', async (req, res) => {
    const allExplorers2= await prisma.explorer2.findMany({});
    res.json(allExplorers2)
})


// Agregando endpoint GET que regresa el explorer al enviar un ID por query params
// localhost:3000/explorers/1
app.get('/explorers/:id', async (req, res) => {
    const id= req.params.id;
    const explorer= await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
})

// localhost:3000/explorers2/1
app.get('/explorers2/:id', async (req,res) => {
    const id= req.params.id;
    const explorer2= await prisma.explorer2.findUnique({where: {id: parseInt(id)}});
    res.json(explorer2)
})


// Crea un endpoint POST con el que vas a poder crear nuevos explorers.
app.post('/explorers', async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

// explorers2
app.post('/explorers2', async (req,res) => {
    const explorer2= {
        name: req.body.name,
        lang: req.body.lang,
        missionCommander: req.body.missionCommander
    };
    const message = 'Explorer2 creado. ';
    await prisma.explorer2.create({data: explorer2});
    return res.json({message});
});


// Creando endpoint PUT, en el cual recibiras el ID del explorer a actualizar, y en el cuerpo del request los
// campos a actualizar, para este caso solo haremos el update del campo mission
app.put('/explorers/:id', async (req,res) => {
    const id = parseInt(req.params.id);

    await prisma.explorer.update({
        where: {
            id: id
        },
        data: {
            mission: req.body.mission
        }
    })
    return res.json({message: "Explorer actualizado correctamente"});
});

// explorers2
app.put('/explorers2/:id', async (req,res) => {
    const id = parseInt(req.params.id);

    await prisma.explorer2.update({
        where: {
            id: id
        },
        data: {
            lang: req.body.lang
        }
    })
    return res.json({message: "Explorer2 actualizado correctamente"});
});


// Endpoint DELETE para eliminar un explorer dado un ID por query params.
app.delete('/explorers/:id', async(req,res) => {
    const id= parseInt(req.params.id);
    await prisma.explorer.delete({where: {id: id}});
    return res.json({message: "Explorer eliminado correctamente"});
});

// explorers2
app.delete('/explorers2/:id', async(req,res) =>{
    const id= parseInt(req.params.id);
    await prisma.explorer2.delete({where: {id: id}});
    return res.json({message: "Explorer2 eliminado correctamente"});
});