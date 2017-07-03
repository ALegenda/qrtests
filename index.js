var express = require('express');
var app = express();


app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response)
{
    response.send('All right');
});

app.get('/kek', function (request, response)
{
    response.send('kek');
});

app.get('/receipts/check', function (request, response)
{
    response.send(request.query.toString());
});


app.listen(app.get('port'), function ()
{
    console.log('Node app is running on port', app.get('port'));
});

//app.listen(3000);

