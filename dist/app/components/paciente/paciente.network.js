"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../../server"));
const routerPaciente = express_1.default.Router();
routerPaciente.post('/registro', (req, res) => {
    let connection = server_1.default.conexionBD();
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let rut = req.body.rut;
    let region = req.body.region;
    let direccion = req.body.direccion;
    let comuna = req.body.comuna;
    let correo = req.body.correo;
    let contrasena = req.body.contrasena;
    let rol = req.body.rol;
    connection.query("INSERT INTO usuario (rut,contrasena,rol,direccion,region,comuna,correo,nombre,apellido)VALUES(?,?,?,?,?,?,?,?,?))", [rut, contrasena, rol, direccion, region, comuna, correo, nombre, apellido], (req1, cita) => {
        res.status(201).send('usuario creado');
    });
});
exports.default = routerPaciente;
