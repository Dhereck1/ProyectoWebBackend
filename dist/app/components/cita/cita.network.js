"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("../../server"));
const routerCita = express_1.default.Router();
routerCita.get('/all', (req, res) => {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita", (req1, todasLasCitas) => {
        res.send(todasLasCitas);
    });
});
routerCita.get('/:id', (req, res) => {
    const id = req.params['id'];
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita WHERE idCita=?", id, (req1, cita) => {
        res.send(cita);
    });
    //citaController.getCitaById(id);
});
exports.default = routerCita;
