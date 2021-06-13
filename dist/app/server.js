"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cita_1 = __importDefault(require("./components/cita"));
const paciente_1 = __importDefault(require("./components/paciente"));
const cors = require('cors');
const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'proyectobd'
});
connection.connect(function (error) {
    if (error) {
        console.log("NO SE PUDO CONECTAR A LA BD");
        return;
    }
    console.log("CONECTADO A MYSQL");
});
function conexionBD() {
    return connection;
}
function main() {
    const server = express_1.default();
    server.use(cors());
    const port = 3500;
    server.use("/api", cita_1.default, paciente_1.default);
    server.listen(port, () => {
        console.log(`Server corriendo en: http://localhost:${port}`);
    });
}
exports.default = { main, conexionBD };
