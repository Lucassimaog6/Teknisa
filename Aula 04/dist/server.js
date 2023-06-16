"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const programmer_1 = __importDefault(require("./programmer"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
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
function syncDatabase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.sync();
            res.send('Banco de dados sincronizado').status(200);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
function getProgrammers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const programmers = yield programmer_1.default.findAll();
            res.json(programmers).status(201);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
function getProgrammerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const programmer = yield programmer_1.default.findByPk(id);
            res.json(programmer).status(200);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
function createProgrammer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const properties = ['name', 'javascript', 'java', 'python'];
            const check = properties.every((p) => p in data);
            if (!check) {
                res.send('Todos os parâmetros devem ser enviados!').status(500);
                return;
            }
            const newProgrammer = yield programmer_1.default.create(data);
            res.json(newProgrammer).status(201);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
function deleteProgrammer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const record = yield programmer_1.default.findByPk(id);
            if (!record) {
                res.send('Programador não encontrado').status(404);
                return;
            }
            yield record.destroy();
            res.send('Deletado com sucesso').status(200);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
function updateProgrammer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            const record = yield programmer_1.default.findByPk(id);
            if (!record) {
                res.send('Programador não encontrado').status(404);
                return;
            }
            yield record.update(data);
            res.send('Atualizado com sucesso').status(200);
        }
        catch (err) {
            res.send(err).status(500);
        }
    });
}
app.listen(8000, () => {
    console.log('Servidor iniciado na porta 8000.');
});
