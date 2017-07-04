var express = require('express');
var app = express();
var qs = require('qs');
var get = require('simple-get');

app.set('port', (process.env.PORT || 5000));

app.get('/',
    function (request, response)
    {
        response.send('All right');
    }
);

app.get('/kek',
    function (request, response)
    {
        response.send('kek');
    }
);

app.get('/receipts/get',
    function (request, response)
    {
        var params = request.query;
        var params_string = qs.stringify(params);

        get.concat("http://brand.cash/v1/receipts/get?" + params_string,
            function (err, res, data)
            {
                if (err)
                    throw err;

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

