import express, { Request, Response , Router} from "express";
import citaController from "./cita.controller"
import server from "../../server"



const routerCita: Router = express.Router();

routerCita.get('/all', (req: Request, res:Response) => {

    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita", (req1:any, todasLasCitas:any)=>{
        
        res.send(todasLasCitas);
    });
    
});

routerCita.get('/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];

    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita WHERE idCita=?", id, (req1:any, cita:any)=>{
        
        res.send(cita);
    });
    //citaController.getCitaById(id);
});

export default routerCita;