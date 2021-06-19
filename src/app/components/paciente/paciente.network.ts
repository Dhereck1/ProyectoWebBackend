import server from "../../server";


const express= require('express');
const routerPaciente= express();
const bodyParser = require('body-parser');

routerPaciente.use(express.json());
routerPaciente.use(bodyParser.urlencoded({ extended : false }));

const jwt = require('jsonwebtoken');
const token = require('../../configs/config');
const rutaSegura= express.Router();


rutaSegura.use((req:any, res:any, next:any)=>{
    const tokens=req.headers["access-token"];
    console.log(tokens);
    jwt.verify(tokens, token.token , (err:any , decoded:any)=>{
        if(err){
            return res.json("Token inválido");
        }else{
            req.decoded=decoded;
            req.authenticated=true;
            next();
        }
    });
    
});

routerPaciente.get('/token',(req:any,res:any)=>{
    jwt.sign(
        {exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'bar'}, token.token,function(error:any,token:any){
        console.log(token);
        res.json(token);
    });
});


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
    console.log(nuevo);
    connection.query("INSERT INTO `usuario` SET rut=?, contrasena=md5(?), nombre=?, apellido=?, rol=2, direccion=?, region=?, comuna=?, correo=?"
        ,[nuevo.rut,nuevo.contrasena,nuevo.nombre,nuevo.apellido,nuevo.direccion,nuevo.region,nuevo.comuna,nuevo.correo],(req1:any, cita:any)=>{
        res.status(201).send(JSON.stringify('usuario creado'))
    });
});

routerPaciente.get('/all', (req: any, res:any) => {

    let connection = server.conexionBD();
    connection.query("SELECT * FROM usuario WHERE rol=2", (req1:any, todasLasCitas:any)=>{
        
        res.send(todasLasCitas);
    });
    
});

routerPaciente.get('/:id', (req: any, res:any) => {//obtener un usuario por id
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT * FROM usuario WHERE idUsuario=?",id,(req1:any, paciente:any)=>{
        res.send(paciente);  
    });
});

routerPaciente.get('/:id/historia', (req: any, res:any) => {//obtener historia clinica por id
    const id: string = req.params['id'];
    let connection = server.conexionBD();
    connection.query("SELECT historiaClinica FROM usuario WHERE idUsuario=?",id,(req1:any, historia:any)=>{
        res.send(historia);  
    });
});

routerPaciente.post('/login', rutaSegura, (req: any, res:any ) => {
    
    let connection = server.conexionBD();
    const rut=req.body.rut;
    const password=req.body.password;
    console.log("hola");
    console.log(rut);
    console.log(password);
    connection.query("SELECT * FROM usuario WHERE rut=? AND contrasena=md5(?)",[rut,password], (error:any,resultados:any) => {
        
        if(error){
            throw(error);
        }else{
            res.send(resultados);
        }
    });
    
});

routerPaciente.put('/actHist',(req:any,res:any)=>{
    let connection = server.conexionBD();
    let historia=req.body.historiaClinica;
    let id=req.body.idUsuario;
    console.log(req.body)
    connection.query("UPDATE usuario SET historiaClinica=? WHERE idUsuario=?",[historia,id],(error:any, resultados:any)=>{
        if(error){
            throw(error);
        }else{
            res.send(resultados);
        }
    });
});

export default routerPaciente;