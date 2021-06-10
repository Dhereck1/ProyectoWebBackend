import server from "../../server"

const mysql      = require('mysql');


function getAllCitas(){

    let connection = server.conexionBD();
    connection.query("SELECT * FROM cita", (req:any, todasLasCitas:any)=>{
        console.log(todasLasCitas);
        return todasLasCitas;
    });
    
}

function getCitaById(id:string){
    
}

export default {getAllCitas,getCitaById}