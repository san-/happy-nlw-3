import {createConnection} from 'typeorm';

createConnection().catch(err=>{
    console.error(`Erro ao conectar com o banco de dados: ${err}`);    
});