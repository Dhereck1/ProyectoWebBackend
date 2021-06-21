"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const express = require('express');
const routerPaciente = express();
const bodyParser = require('body-parser');
const cors = require('cors');
routerPaciente.use(express.json());
routerPaciente.use(bodyParser.urlencoded({ extended: false }));
routerPaciente.use(cors());
const jwt = require('jsonwebtoken');
const token = require('../../configs/config');
const rutaSegura = express.Router();
rutaSegura.use((req, res, next) => {
    const tokens = req.headers["access-token"];
    console.log(tokens);
    jwt.verify(tokens, token.token, (err, decoded) => {
        if (err) {
            return res.json("Token inválido");
        }
        else {
            req.decoded = decoded;
            req.authenticated = true;
            next();
        }
    });
});
routerPaciente.get('/token', (req, res) => {
    jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'bar' }, token.token, function (error, token) {
        console.log(token);
        res.json(token);
    });
});
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
    connection.query("INSERT INTO `usuario` SET rut=?, contrasena=md5(?), nombre=?, apellido=?, rol=2, direccion=?, region=?, comuna=?, correo=?", [nuevo.rut, nuevo.contrasena, nuevo.nombre, nuevo.apellido, nuevo.direccion, nuevo.region, nuevo.comuna, nuevo.correo], (req1, cita) => {
        res.status(201).send(JSON.stringify('usuario creado'));
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
routerPaciente.post('/login', rutaSegura, (req, res) => {
    let connection = server_1.default.conexionBD();
    const rut = req.body.rut;
    const password = req.body.password;
    console.log("hola");
    console.log(rut);
    console.log(password);
    connection.query("SELECT * FROM usuario WHERE rut=? AND contrasena=md5(?)", [rut, password], (error, resultados) => {
        if (error) {
            throw (error);
        }
        else {
            res.send(resultados);
        }
    });
});
routerPaciente.put('/actHist', (req, res) => {
    let connection = server_1.default.conexionBD();
    let historia = req.body.historiaClinica;
    let id = req.body.idUsuario;
    console.log(req.body);
    connection.query("UPDATE usuario SET historiaClinica=? WHERE idUsuario=?", [historia, id], (error, resultados) => {
        if (error) {
            throw (error);
        }
        else {
            res.send(resultados);
        }
    });
});
exports.default = routerPaciente;
