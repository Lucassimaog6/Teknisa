import express from "express";
import bodyParser from "body-parser";
import Programmer from "./programmer";
import database from "./db";

const app = express();
app.use(bodyParser.json());

// sincronizar o banco com o arquivo
app.get('/sync', syncDatabase);

// Pega todos os programadores
app.get('/', getProgrammers);

// Pega um determinado programador pelo id
app.get('/:id', getProgrammerById);

// Cria um programador
app.post('/', createProgrammer);

// Deleta um programador determinado pelo id
app.delete('/:id', deleteProgrammer);

// Atualiza um programador determinado pelo id
app.put('/:id', updateProgrammer);

async function syncDatabase(req: express.Request, res: express.Response) {
    try {
        await database.sync();
        res.send('Banco de dados sincronizado').status(200);
    } catch (err) {
        res.send(err).status(500);
    }
}

async function getProgrammers(req: express.Request, res: express.Response) {
    try {
        const programmers = await Programmer.findAll();
        res.json(programmers).status(201);
    } catch (err) {
        res.send(err).status(500);
    }
}

async function getProgrammerById(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const programmer = await Programmer.findByPk(id);
        res.json(programmer).status(200);
    } catch (err) {
        res.send(err).status(500);
    }
}

async function createProgrammer(req: express.Request, res: express.Response) {
    try {
        const data = req.body;
        const properties = ['name', 'javascript', 'java', 'python'];
        const check = properties.every((p) => p in data);

        if (!check) {
            res.send('Todos os parâmetros devem ser enviados!').status(500);
            return;
        }

        const newProgrammer = await Programmer.create(data);
        res.json(newProgrammer).status(201);
    } catch (err) {
        res.send(err).status(500);
    }
}

async function deleteProgrammer(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const record = await Programmer.findByPk(id);

        if (!record) {
            res.send('Programador não encontrado').status(404);
            return;
        }

        await record.destroy();

        res.send('Deletado com sucesso').status(200);
    } catch (err) {
        res.send(err).status(500);
    }
}

async function updateProgrammer(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const data = req.body;
        const record = await Programmer.findByPk(id);

        if (!record) {
            res.send('Programador não encontrado').status(404);
            return;
        }

        await record.update(data);

        res.send('Atualizado com sucesso').status(200);
    } catch (err) {
        res.send(err).status(500);
    }
}

app.listen(8000, () => {
    console.log('Servidor iniciado na porta 8000.');
});