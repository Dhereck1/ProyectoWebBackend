import express, { Request, Response , Router} from "express";
import paciente from ".";
import server from "../../server"


const bodyParser = require('body-parser');
const routerPaciente= express();
routerPaciente.use(express.json());


routerPaciente.post('/registro' ,(req:any,res:any)=>{
    let connection = server.conexionBD();
    let nuevo={
        idUsuario:null,
        rut:req.body.rut,
        contrasena:req.body.contrasena,
        historiaClinica:null,
        rol:req.body.rol,
        direccion:req.body.direccion,
        region:req.body.region,
        comuna:req.body.comuna,
        correo:req.body.correo,
        nombre:req.body.nombre,
        apellido:req.body.apellido,
    }
    console.log(nuevo)
    connection.query("INSERT INTO `usuario` SET ?",nuevo,(req1:any, cita:any)=>{
        res.status(201).send('usuario creado')
    });
});

routerPaciente.get('/all', (req: Request, res:Response) => {

    let connection = server.conexionBD();
    connection.query("SELECT * FROM usuario WHERE rol=2", (req1:any, todasLasCitas:any)=>{
        
        res.send(todasLasCitas);
    });
    
});

routerPaciente.get('/:id', (req: Request, res:Response) => {//obtener un usuario por id
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM usuario WHERE idUsuario=?",id,(req1:any, paciente:any)=>{
        res.send(paciente);  
    });
});

routerPaciente.get('/:id/historia', (req: Request, res:Response) => {//obtener historia clinica por id
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT historiaClinica FROM usuario WHERE idUsuario=?",id,(req1:any, historia:any)=>{
        res.send(historia);  
    });
});




export default routerPaciente;