import { mongoClient } from '../index.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretJWT = 'fdgs12h13fsvh31hjgfds31njfv324';


export function registr(mongo) {
    return async function(req, res) {
        let db = mongo.db('MyDataBase');
        let users = db.collection('users');

        let password = req.body.password;
        let solt = await bcrypt.genSalt(10);
        let passwordhash = await bcrypt.hash(password, solt);

        await users.insertOne({
            email: req.body.email,
            passwordhash: passwordhash,
            nickname: req.body.nickname,
            lastIP: req.ip,
            monetbalance: 0,
            cristalbalance: 0,
        })

        let user = await users.findOne({ email: req.body.email });

        let token = jwt.sign({ id: user._id }, secretJWT);

        res.json({
            token: token,
            nickname: user.nickname,
            email: user.email,
            monetbalance: user.monetbalance,
            cristalbalance: user.cristalbalance,
        });
    }
}

export function login(mongo) {
    return async function(req, res) {
        const bodyIP = req.ip;

        let db = mongo.db('MyDataBase');
        let users = db.collection('users');

        let user = await users.findOne({ email: req.body.email });
        let token = jwt.sign({ id: user._id }, secretJWT);

        res.json({
            token: token,
            nickname: user.nickname,
            email: user.email,
            monetbalance: user.monetbalance,
            cristalbalance: user.cristalbalance,
        });

        await users.updateOne({ email: req.body.email }, { $set: { lastIP: bodyIP } });

    }
}

export function authme(mongo) {
    return async function(req, res) {
        const bodyID = jwt.decode(req.body.token, secretJWT).id;
        const bodyIP = req.ip;

        let db = mongo.db('MyDataBase');
        let users = db.collection('users');

        let user = await users.findOne({ _id: ObjectId(bodyID) });

        if (user === null) return res.status(400).json({
            message: 'Ошибка при авторизации'
        })

        if (user.lastIP === bodyIP) {
            let token = jwt.sign({ id: user._id }, secretJWT);

            res.json({
                token: token,
                nickname: user.nickname,
                email: user.email,
                monetbalance: user.monetbalance,
                cristalbalance: user.cristalbalance,
            });

        } else return res.status(400).json({
            message: 'Пожалуйста войдите в аккаунт'
        })
    }
}


















//