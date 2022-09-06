import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';

import { CheckDataForRegistr, CheckDataForLogin } from './utils/checkdata.js'
import { registr, login, authme } from './controllers/auth.js'
import { addcoin } from './controllers/addcoin.js'
import { checkaddcoin } from './utils/checkcoin.js'

let app = express();
app.use(cors())
app.use(express.json());
const mongopassword = 'opYN8bQReMNppWsE';
export const mongoClient = new MongoClient(`mongodb+srv://Senails:${mongopassword}@cluster0.6f5yy4e.mongodb.net/`, {
    useUnifiedTopology: true
});




app.post('/auth/registr', CheckDataForRegistr, registr);
app.post('/auth/login', CheckDataForLogin, login);
app.post('/auth/me', authme);
app.post('/addcoins', checkaddcoin, addcoin)






let PORT = process.env.PORT || 4000
app.listen(PORT, function() {
    console.log('running');
});





























//11