var express = require('express');
var app = express();
var qs = require('qs');
var get = require('simple-get');
var url = "mongodb://TomKuper:dbpassword1234@ds153682.mlab.com:53682/heroku_hpg38gzm";
var mongodb = require("mongodb");
var db;
var ObjectID = require('mongodb').ObjectID;

app.set('port', (process.env.PORT || 5000));

mongodb.MongoClient.connect(process.env.MONGODB_URI || url,
    function (err, database)
    {
        if (err)
        {
            console.log(err);
            process.exit(1);
        }

        db = database;
        console.log('ok');

    });

app.get('/',
    function (request, response)
    {
        response.send('All right');
    }
);

app.get('/kek',
    function (request, response)
    {
        response.send("kek");
    }
);

app.get('/api/gethisory',
    function (request, response)
    {
        var collection = db.collection('Logs');
        var token = request.header("token");

        collection.find({'token': token}).toArray(
            function (err, results)
            {
                response.send(results); // output all records
            }
        );

    }
);

app.get('/receipts/get',
    function (request, response)
    {
        var params = request.query;
        var params_string = qs.stringify(params);
        var collection = db.collection('Logs');

        get.concat("http://brand.cash/v1/receipts/get?" + params_string,
            function (err, res, data)
            {
                if (err)
                    throw err;

                var token = request.header("token");
                if (token)
                {
                    var tmp = JSON.parse(data.toString());
                    collection.insertOne({"token": token, "data": tmp});
                }

                response.send(data.toString());

            }
        );

    }
);

app.get('/receipts/check',
    function (request, response)
    {

        var params = request.query;
        var params_string = qs.stringify(params);

        get.concat("http://brand.cash/v1/receipts/check?" + params_string,
            function (err, res, data)
            {
                if (err)
                    throw err;

                response.send(data.toString());
            }
        );

    }
);

app.listen(app.get('port'),
    function ()
    {
        console.log('Node app is running on port', app.get('port'));
    }
);

