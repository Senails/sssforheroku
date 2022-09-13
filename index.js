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


mongoClient.connect(async function(err, mongo) {
    if (err) return console.log('Ошибка подключения в базе данных')

    app.post('/auth/registr', CheckDataForRegistr(mongo), registr(mongo));
    app.post('/auth/login', CheckDataForLogin(mongo), login(mongo));
    app.post('/auth/me', authme(mongo));
    app.post('/addcoins', checkaddcoin, addcoin(mongo))

})


let PORT = process.env.PORT || 4000
app.listen(PORT, function() {
    console.log('running');
});





























//11