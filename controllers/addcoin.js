import { mongoClient } from '../index.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
const secretJWT = 'fdgs12h13fsvh31hjgfds31njfv324';


export function addcoin(mongo) {
    return async function(req, res) {
        const bodyID = jwt.decode(req.body.token, secretJWT).id;
        const coins = req.body.coin

        let db = mongo.db('MyDataBase');
        let users = db.collection('users');
        let user = await users.findOne({ _id: ObjectId(bodyID) });

        let monetbalance = user.monetbalance

        res.json({
            monetbalance: monetbalance + coins
        })

        users.updateOne({ _id: ObjectId(bodyID) }, { $set: { monetbalance: monetbalance + coins } });
    }
}