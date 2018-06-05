var express = require('express');
var app = express();
var qs = require('qs');
var get = require('simple-get');
var url = "mongodb://TomKuper:dbpassword1234@ds137650.mlab.com:37650/heroku_t9zfwvj6";
var mongodb = require("mongodb");
var data;
var ObjectID = require('mongodb').ObjectID;
//
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
            console.log(err);

        }

        data = database.db('heroku_t9zfwvj6');
        console.log('ok');

    }
);

app.get(
    '/admin',
    function (request, response)
    {
        response.render("index.html");
    }
);

app.get(
    '/',
    function (request, response)
    {
        response.send('All right');
    }
);

app.get(
    '/kek',
    function (request, response)
    {
        response.send("kek");
    }
);

app.get(
    '/api/gethistory/:token',
    function (request, response)
    {
        var collection = data.collection('Logs');
        var token = request.params.token;

        collection.find({'token': token}).toArray(
            function (err, results)
            {
                response.send(results); // output all records
            }
        );

    }
);

app.get(
    '/api/gethistory',
    function (request, response)
    {
        var collection = data.collection('Logs');

        collection.find({}).toArray(
            function (err, results)
            {
                response.send(results); // output all records
            }
        );

    }
);

app.get(
    '/api/register',
    function (request, response)
    {
        var collection = data.collection('users');
    }
);

app.post(
    '/receipts/get',
    function (request, response)
    {
        var params = request.query;
        var params_string = qs.stringify(params);
        var collection = data.collection('Logs');

        get.concat(
            "http://brand.cash/v1/receipts/get?" + params_string,
            function (err, res, data)
            {
                if (err)
                {
                    response.send(err);
                    return;
                }

                var token = request.header("token");
                if (token)
                {
                    var tmp = JSON.parse(data.toString());

                    collection.findOne({'data': tmp}).then(
                        function (doc)
                        {
                            if (!doc)
                                collection.insertOne({"token": token, "data": tmp});
                        });
                }

                response.send(data.toString());

            }
        );

    }
);

app.get(
    '/receipts/get',
    function (request, response)
    {
        var params = request.query;
        var params_string = qs.stringify(params);
        var collection = data.collection('Logs');

        get.concat(
            "http://brand.cash/v1/receipts/get?" + params_string,
            function (err, res, data)
            {
                if (err)
                {
                    response.send(err);
                    return;
                }
               

                collection.insertOne({"token": token, "data": tmp});

                response.send(data.toString());

            }
        );

    }
);

app.get(
    '/receipts/check',
    function (request, response)
    {

        var params = request.query;
        var params_string = qs.stringify(params);

        get.concat(
            "http://brand.cash/v1/receipts/check?" + params_string,
            function (err, res, data)
            {
                if(err) return next(err);

                response.send(data.toString());
            }
        );

    }
);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.listen(
    app.get('port'),
    function ()
    {
        console.log('Node app is running on port', app.get('port'));
    }
);
