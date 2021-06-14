"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../../server"));
const bodyParser = require('body-parser');
const routerPaciente = express_1.default();
routerPaciente.use(express_1.default.json());
routerPaciente.post('/registro', (req, res) => {
    let connection = server_1.default.conexionBD();
    let nuevo = {
        idUsuario: null,
        rut: req.body.rut,
        contrasena: req.body.contrasena,
        historiaClinica: null,
        rol: req.body.rol,
        direccion: req.body.direccion,
        region: req.body.region,
        comuna: req.body.comuna,
        correo: req.body.correo,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
    };
    console.log(nuevo);
    connection.query("INSERT INTO `usuario` SET ?", nuevo, (req1, cita) => {
        res.status(201).send('usuario creado');
    });
});
routerPaciente.get('/all', (req, res) => {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM usuario WHERE rol=2", (req1, todasLasCitas) => {
        res.send(todasLasCitas);
    });
});
routerPaciente.get('/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM usuario WHERE idUsuario=?", id, (req1, paciente) => {
        res.send(paciente);
    });
});
routerPaciente.get('/:id/historia', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT historiaClinica FROM usuario WHERE idUsuario=?", id, (req1, historia) => {
        res.send(historia);
    });
});
exports.default = routerPaciente;
