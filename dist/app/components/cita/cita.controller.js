"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const mysql = require('mysql');
function getAllCitas() {
    let connection = server_1.default.conexionBD();
    connection.query("SELECT * FROM cita", (req, todasLasCitas) => {
        console.log(todasLasCitas);
        return todasLasCitas;
    });
}
function getCitaById(id) {
}
exports.default = { getAllCitas, getCitaById };
