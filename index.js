import mongodb from 'mongodb';
import express from 'express'

let mongoClient = new mongodb.MongoClient('mongodb+srv://Senails:opYN8bQReMNppWsE@cluster0.6f5yy4e.mongodb.net/', {
    useUnifiedTopology: true
});

let app = express();

app.get('/', (req, res) => {
    mongoClient.connect(async function(error, mongo) {
        let db = mongo.db('MyDataBase');
        let coll = db.collection('red');
        let text = await coll.findOne();
        res.send(text)
    });
})




let PORT = process.env.PORT || 1234
app.listen(PORT, function() {
    console.log('running');
});


































//11