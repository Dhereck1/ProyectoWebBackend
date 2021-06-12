import express, { Request, Response , Router} from "express";
import server from "../../server"


const routerPaciente: Router = express.Router();

routerPaciente.post('/registro', (req:Request,res:Response)=>{

    let connection = server.conexionBD();
    let nombre = req.body.nombre;
    let apellido=req.body.apellido;
    let rut=req.body.rut;
    let region=req.body.region;
    let direccion=req.body.direccion;
    let comuna=req.body.comuna;
    let correo=req.body.correo;
    let contrasena=req.body.contrasena;
    let rol=req.body.rol;


    connection.query("INSERT INTO usuario (rut,contrasena,rol,direccion,region,comuna,correo,nombre,apellido)VALUES(?,?,?,?,?,?,?,?,?))",[rut,contrasena,rol,direccion,region,comuna,correo,nombre,apellido],(req1:any, cita:any)=>{
        res.status(201).send('usuario creado')
    });
});



export default routerPaciente;