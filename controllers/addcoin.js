import { mongoClient } from '../index.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
const secretJWT = 'fdgs12h13fsvh31hjgfds31njfv324';


export function addcoin(req, res) {
    const bodyID = jwt.decode(req.body.token, secretJWT).id;
    const coins = req.body.coin

    mongoClient.connect(async(err, mongo) => {
        if (err) return res.status(500).type('text/plain').send('Ошибка подключения к базе данных');
        let db = mongo.db('MyDataBase');
        let users = db.collection('users');
        let user = await users.findOne({ _id: ObjectId(bodyID) });

        let monetbalance = user.monetbalance

        res.json({
            monetbalance: monetbalance + coins
        })

        users.updateOne({ _id: ObjectId(bodyID) }, { $set: { monetbalance: monetbalance + coins } });
    });
}