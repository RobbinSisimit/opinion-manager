import { config } from 'dotenv';
config();

import { iniciarServidor, crearAdmin } from './configs/server.js'; 

const startApp = async () => {
    await iniciarServidor();
    await crearAdmin(); 
};

startApp();
