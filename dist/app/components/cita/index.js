"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cita_network_1 = __importDefault(require("./cita.network"));
const cita = express_1.default();
cita.use('/cita', cita_network_1.default);
exports.default = cita;
