import express, { Request, Response , Router} from "express";
import server from "../../server"

const cors = require('cors');
const bodyParser = require('body-parser');
//const routerCita: Router = express.Router();

const routerCita= express();
routerCita.use(cors());

routerCita.use(bodyParser.json()); //agregó jo
//routerCita.use(bodyParser.urlencoded({ extended : false })); //agrego jo ver si es que despues tiene conflicto con express.json

routerCita.use(express.json());


routerCita.get('/all', (req: Request, res:Response) => {

    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita", (req1:any, todasLasCitas:any)=>{
        
        res.send(todasLasCitas);
    });
    
});



routerCita.get('/admin/allMedicos', (req: Request, res:Response) => {

    let connection = server.conexionBD();
    connection.query("SELECT * FROM medico", (req1:any, todosLosMedicos:any)=>{
        
        res.send(todosLosMedicos);
        console.log(todosLosMedicos);
    });
    
});


routerCita.get('/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita WHERE idUsuario=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});

routerCita.get('/citaById/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita WHERE idCita=?", id, (req1:any, cita:any)=>{
        res.send(cita);
    });
});


routerCita.get('/medico/cita/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];

    let connection = server.conexionBD();
    connection.query("SELECT m.nombre, m.apellido FROM medico m WHERE m.idMedico=?", id, (req1:any, [nombresMed]:any[])=>{
        res.send(nombresMed);
    });
    
});

routerCita.get('/paciente/:id', (req: Request, res:Response) => {
    const id: string = req.params['id'];

    let connection = server.conexionBD();
    connection.query(`SELECT u.nombre, u.apellido FROM usuario u WHERE u.idUsuario=${id}`, (req1:any, [nombresP]:any[])=>{
        res.send(nombresP);
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
    connection.query(`SELECT u.nombreEspecialidad FROM especialidades u WHERE u.idEspecialidad=${id}`, id, (req1:any, [cita]:any[])=>{
        res.send(cita);
        console.log(cita);
    });
});



routerCita.post('/anadirCita', (req:any,res:any)=>{
    let connection = server.conexionBD();

    let nuevo={
        idUsuario: req.body.idUsuario,
        idMedico: req.body.idMedico,
        fecha: null,
        hora: null,
        descripcion: req.body.descripcion,
        estado:req.body.estado,
    }
    connection.query("INSERT INTO `cita` SET ?", nuevo,(req1:any, cita:any)=>{
        res.status(201).send(JSON.stringify('cita creada')); 
    });
});

routerCita.put('/editarCita',(req:Request,res:Response)=>{
    let connection = server.conexionBD();
    let idCita=req.body.idCita;
    let idMedico=req.body.idMedico;
    let idUsuario=req.body.idUsuario;
    let estado=req.body.estado;
    let fecha=req.body.fecha;
    let hora=req.body.hora;
    let fechaActual=new Date();
    console.log(req.body)
    connection.query("UPDATE cita SET estado=? , fecha=? , hora=? , idMedico=? WHERE idCita=?",[estado,fecha,hora,idMedico,idCita],(req1:any, cita:any)=>{
        res.status(200).send(JSON.stringify('cita actualizada'));
        if(estado=="Cerrada"){
            connection.query("INSERT INTO `canceladas` SET idUsuario=? , idCita=? , fecha=?",[idUsuario,idCita,fechaActual],(error:any,res2:any)=>{
                if(error){
                    throw(error);
                }
            })
        }
    });
});

routerCita.put('/cancelarCita',(req:Request,res:Response)=>{
    let connection = server.conexionBD();
    let idCita=req.body.idCita;
    let idUsuario=req.body.idUsuario;
    let estado=req.body.estado;
    let fechaActual=new Date();
    connection.query("UPDATE cita SET estado=? WHERE idCita=?",[estado,idCita],(req1:any, cita:any)=>{   
        res.status(200).send(JSON.stringify('cita cancelada'));
        connection.query("INSERT INTO `canceladas` SET idUsuario=? , idCita=? , fecha=?",[idUsuario,idCita,fechaActual],(error:any,res2:any)=>{
            if(error){
                throw(error);
            }
        })
    });
});

export default routerCita;