import express,{Express} from "express";
import cita from "./components/cita";
import paciente from "./components/paciente";

const cors = require('cors');
const mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'proyectobd'
});

 
connection.connect( function(error:any){
    if (error){
        console.log("NO SE PUDO CONECTAR A LA BD");
        return;
    }
    console.log("CONECTADO A MYSQL");
});

function conexionBD(){
    return connection;
}

function main(){

    const server:Express= express();
    server.use(cors());
    const port:number=3500;

    server.use("/api" , cita , paciente);
    server.listen(port,() =>{
        console.log(`Server corriendo en: http://localhost:${port}`);
    })
}

export default{main, conexionBD}