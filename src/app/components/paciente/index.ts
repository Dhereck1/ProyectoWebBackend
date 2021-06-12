import express, {Express} from "express";
import routerPaciente from "./paciente.network";

const paciente: Express = express();

paciente.use('/paciente' , routerPaciente);

export default paciente;