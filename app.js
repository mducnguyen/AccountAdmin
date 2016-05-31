var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var config = require('./configs/config');
// var https = require('https');
var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
};

var apiRoutes = require('./app/routes/apiRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// database setup
// app.settings.env = process.env.NODE_ENV;

console.log(app.settings.env);
var port = process.env.PORT || 3000;
mongoose.connect(config.database[app.settings.env]);
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
    });


    next();
});

app.use('/api', apiRoutes);


app.get('/', function (req, res, next) {
    res.send("Hello World!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

https.createServer(options, app).listen(port);

// app.listen(port);
console.log('Server is listening at: https://localhost:' + port);
// console.log('Server is listening at:'+app.env.host);
