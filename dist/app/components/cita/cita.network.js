"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../../server"));
const routerCita = express_1.default();
routerCita.use(express_1.default.json());
routerCita.get('/all', (req, res) => {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita", (req1, todasLasCitas) => {
        res.send(todasLasCitas);
    });
});
routerCita.get('/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE idUsuario=?", id, (req1, cita) => {
        res.send(cita);
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
    connection.query("SELECT c.* FROM cita c JOIN medico m ON c.idMedico=m.idMedico JOIN especialidades e ON m.especialidad=e.idEspecialidad WHERE e.idEspecialidad=?", id, (req1, cita) => {
        res.send(cita);
    });
});
routerCita.get('/medico/:idCita', (req, res) => {
    const id = req.params['idCita'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT m.nombre, m.apellido FROM medico m JOIN cita c ON m.idMedico=c.idMedico WHERE c.idCita=?", id, (req1, nombresMed) => {
        res.send(nombresMed);
    });
});
routerCita.post('/añadirCita', (req, res) => {
    let connection = server_1.default.conexionBD();
    let idUsuario = req.body.idUsuario;
    let idMedico = req.body.idMedico;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    let descripcion = req.body.descripcion;
    let estado = req.body.estado;
    connection.query("INSERT INTO cita(idUsuario,idMedico,fecha,hora,descripcion,estado)VALUES(?,?,?,?,?,?))", [idUsuario, idMedico, fecha, hora, descripcion, estado], (req1, cita) => {
        res.status(201).send('cita creada');
    });
});
routerCita.put('/editarCita', (req, res) => {
    let connection = server_1.default.conexionBD();
    let idCita = req.body.idCita;
    let estado = req.body.estado;
    let fecha = req.body.fecha;
    let hora = req.body.hora;
    connection.query("UPDATE cita SET estado=? fecha=? hora=? WHERE idCita=?", [estado, fecha, hora, idCita], (req1, cita) => {
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
