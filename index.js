var express = require('express');
var app = express();
var mongodb = require("mongodb");
var url = "mongodb://TomKuper:dbpassword1234@ds137650.mlab.com:37650/heroku_t9zfwvj6";
var localBase;

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


mongodb.MongoClient.connect(
    process.env.MONGODB_URI || url,
    function (err, database)
    {
        if (err)
        {
            return console.log(err);
        }

        localBase = database.db('heroku_t9zfwvj6');
        console.log('ok');

    }
);


app.get(
    '/',
    function (request, response)
    {
        var collection = localBase.collection('tmp');

        collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            count = result[0].count;

            collection.updateOne({"data":"tmp"},{$set: {"data" : "tmp", "count": ++count}});

            response.json("Проверяем нагрузоустойчивость бесплатного хостинга. На сайт зашли столько раз : "+count);
        });


    }
);

app.listen(
    app.get('port'),
    function ()
    {
        console.log('Node app is running on port', app.get('port'));
    }
);
