export function checkaddcoin(req, res, next) {
    let bodykey = req.body.key
    let coin = req.body.coin;
    let needkey = getkey();

    if (bodykey === needkey && coin > 0) {
        next();
    } else {
        res.status(400).json({
            message: 'Какая-то фигня',
            key: getkey(),
        })
    }
}


function getkey() {
    let date = new Date();
    let y = date.getUTCFullYear();
    let m = date.getUTCMonth();
    let d = date.getUTCDate();
    let h = date.getUTCHours();
    let min = date.getUTCMinutes();
    let sec = date.getUTCSeconds();

    let str = Math.floor(sec / 10);

    let sum = +('' + y + m + d + h + min + str) * min * str;

    return sum
}