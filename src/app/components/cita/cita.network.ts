import express, { Request, Response , Router} from "express";
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
    connection.query("SELECT * FROM cita WHERE idUsuario=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});

routerCita.get('/medico/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita WHERE idMedico=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});

routerCita.get('/estado/:estado', (req: Request, res:Response) => {
    const id: string = req.params['estado'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita WHERE estado=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});

routerCita.get('/especialidad/:especialidad', (req: Request, res:Response) => {
    const id: string = req.params['especialidad'];

    let connection = server.conexionBD();
    connection.query("SELECT c.* FROM cita c JOIN medico m ON c.idMedico=m.idMedico JOIN especialidades e ON m.especialidad=e.idEspecialidad WHERE e.idEspecialidad=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});


routerCita.get('/medico/:idCita', (req: Request, res:Response) => {
    const id: string = req.params['idCita'];

    let connection = server.conexionBD();
    connection.query("SELECT m.nombre, m.apellido FROM medico m JOIN cita c ON m.idMedico=c.idMedico WHERE c.idCita=?", id, (req1:any, nombresMed:any)=>{
        res.send(nombresMed);
    });
});

routerCita.post('/añadirCita', (req:Request,res:Response)=>{

    let connection = server.conexionBD();
    let idUsuario=req.body.idUsuario;
    let idMedico=req.body.idMedico;
    let fecha=req.body.fecha;
    let hora=req.body.hora;
    let descripcion=req.body.descripcion;
    let estado=req.body.estado;
    connection.query("INSERT INTO cita(idUsuario,idMedico,fecha,hora,descripcion,estado)VALUES(?,?,?,?,?,?))",[idUsuario,idMedico,fecha,hora,descripcion,estado],(req1:any, cita:any)=>{
        res.status(201).send('cita creada')
    });
});

routerCita.put('/editarCita',(req:Request,res:Response)=>{
    let connection = server.conexionBD();
    let idCita=req.body.idCita;
    let estado=req.body.estado;
    let fecha=req.body.fecha;
    let hora=req.body.hora;
    connection.query("UPDATE cita SET estado=? fecha=? hora=? WHERE idCita=?",[estado,fecha,hora,idCita],(req1:any, cita:any)=>{
        res.status(200).send('cita actualizada');
    });
});

export default routerCita;