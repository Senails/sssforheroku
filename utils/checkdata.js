import bcrypt from 'bcrypt';


export function CheckDataForRegistr(mongo) {
    return async function(req, res, next) {
        const bodyemail = req.body.email;
        const bodyname = req.body.nickname;

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

    }
}

export function CheckDataForLogin(mongo) {
    return async function(req, res, next) {
        const bodyemail = req.body.email;
        const bodypassword = req.body.password;

        //проверяем есть ли такой пользователь в бдшке
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

    }
}



//