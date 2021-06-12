"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paciente_network_1 = __importDefault(require("./paciente.network"));
const paciente = express_1.default();
paciente.use('/paciente', paciente_network_1.default);
exports.default = paciente;
