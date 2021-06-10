import express, {Express} from "express";
import routerCita from "./cita.network";

const cita: Express = express();

cita.use('/cita' , routerCita);

export default cita;