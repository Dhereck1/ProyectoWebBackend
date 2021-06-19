"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../../server"));
//const cors = require('cors');
const bodyParser = require('body-parser');
//const routerCita: Router = express.Router();
const routerCita = express_1.default();
routerCita.use(bodyParser.json()); //agregó jo
routerCita.use(bodyParser.urlencoded({ extended: false })); //agrego jo ver si es que despues tiene conflicto con express.json
routerCita.use(express_1.default.json());
routerCita.get('/all', (req, res) => {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita", (req1, todasLasCitas) => {
        res.send(todasLasCitas);
    });
});
routerCita.get('/admin/allMedicos', (req, res) => {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM medico", (req1, todosLosMedicos) => {
        res.send(todosLosMedicos);
        console.log(todosLosMedicos);
    });
});
routerCita.get('/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE idUsuario=?", id, (req1, cita) => {
        res.send(cita);
    });
});
routerCita.get('/citaById/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE idCita=?", id, (req1, cita) => {
        res.send(cita);
    });
});
routerCita.get('/medico/cita/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT m.nombre, m.apellido FROM medico m WHERE m.idMedico=?", id, (req1, [nombresMed]) => {
        res.send(nombresMed);
    });
});
routerCita.get('/paciente/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query(`SELECT u.nombre, u.apellido FROM usuario u WHERE u.idUsuario=${id}`, (req1, [nombresP]) => {
        res.send(nombresP);
    });
});
routerCita.get('/medico/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE idMedico=?", id, (req1, cita) => {
        res.send(cita);
    });
});
routerCita.get('/estado/:estado', (req, res) => {
    const id = req.params['estado'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE estado=?", id, (req1, cita) => {
        res.send(cita);
    });
});
routerCita.get('/especialidad/:especialidad', (req, res) => {
    const id = req.params['especialidad'];
    let connection = server_1.default.conexionBD();
    connection.query(`SELECT u.nombreEspecialidad FROM especialidades u WHERE u.idEspecialidad=${id}`, id, (req1, [cita]) => {
        res.send(cita);
        console.log(cita);
    });
});
routerCita.post('/anadirCita', (req, res) => {
    let connection = server_1.default.conexionBD();
    let nuevo = {
        idUsuario: req.body.idUsuario,
        idMedico: req.body.idMedico,
        fecha: null,
        hora: null,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    connection.query("INSERT INTO `cita` SET ?", nuevo, (req1, cita) => {
        res.status(201).send(JSON.stringify('cita creada'));
    });
});
routerCita.put('/editarCita', (req, res) => {
    let connection = server_1.default.conexionBD();
    let idCita = req.body.idCita;
    let idMedico = req.body.idMedico;
    let estado = req.body.estado;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    console.log(req.body);
    connection.query("UPDATE cita SET estado=? , fecha=? , hora=? , idMedico=? WHERE idCita=?", [estado, fecha, hora, idMedico, idCita], (req1, cita) => {
        res.status(200).send('cita actualizada');
    });
});
routerCita.put('/cancelarCita', (req, res) => {
    let connection = server_1.default.conexionBD();
    let idCita = req.body.idCita;
    let estado = req.body.estado;
    connection.query("UPDATE cita SET estado=? WHERE idCita=?", [estado, idCita], (req1, cita) => {
        res.status(200).send('cita cancelada');
    });
});
exports.default = routerCita;
