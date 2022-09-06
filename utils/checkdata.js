import { mongoClient } from '../index.js'
import bcrypt from 'bcrypt';


export async function CheckDataForRegistr(req, res, next) {
    const bodyemail = req.body.email;
    const bodyname = req.body.nickname;

    //проверяем есть ли такой пользователь в бдшке
    mongoClient.connect(async(err, mongo) => {
        if (!err) {
            let db = mongo.db('MyDataBase');
            let users = db.collection('users');




            let usercheck1 = await users.findOne({ email: bodyemail })
            if (usercheck1 !== null) {
                return res.status(400).json({
                    message: 'Email не подходит'
                })
            }

            let usercheck2 = await users.findOne({ nickname: bodyname })
            if (usercheck2 !== null) {
                return res.status(400).json({
                    message: 'Имя пользователя занято'
                })
            }

            next();
        } else {
            res.status(500).type('text/plain').send('Ошибка подключения к базе данных');
        }
    })
}

export async function CheckDataForLogin(req, res, next) {
    const bodyemail = req.body.email;
    const bodypassword = req.body.password;

    //проверяем есть ли такой пользователь в бдшке
    mongoClient.connect(async(err, mongo) => {
        if (!err) {
            let db = mongo.db('MyDataBase');
            let users = db.collection('users');

            let user = await users.findOne({ email: bodyemail });

            if (user === null) {

                return res.status(400).json({
                    message: 'Неверный логин или пароль'
                });

            } else {

                let passCheck = await bcrypt.compare(bodypassword, user.passwordhash);
                if (!passCheck) {
                    return res.status(400).json({
                        message: 'Неверный логин или пароль'
                    });
                }

            }
            next();
        } else {
            res.status(500).type('text/plain').send('Ошибка подключения к базе данных');
        }
    })
}


//