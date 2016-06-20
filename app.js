/**
 * Module dependencies.
 */
const fs = require('fs');
const https = require('https');
const debug = require('debug')('est_server:server');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const mdns = require('mdns');

const setup = require('./routes/setup');
const est_methods = require('./routes/est_methods');
const api = require('./routes/api');

const app = express();
const config = require('./conf').get_conf();

mongoose.connect(config.db.conn_str);

app.disable('x-powered-by');
app.set('etag', false);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'frontend', 'public')));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.use('/setup', setup);
app.use('/api/v1', bodyParser.json(), api);
app.use('/.well-known/est', est_methods);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);

        res.json({
            success: false,
            error: err.message,
            exception: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);

    res.json({
        success: false,
        error: err.message
    });
});

const port_https = process.env.EST_SECURE_SERVER_PORT | '3443';

const https_options = {
    key: fs.readFileSync(path.join(__dirname, config.server.key), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, config.server.cert), 'utf8'),
    ca: [fs.readFileSync(path.join(__dirname, config.server.ca), 'utf8')],
    requestCert: true,
    rejectUnauthorized: false
};


var secure_server = https.createServer(https_options, app);

secure_server.listen(port_https);

secure_server.on('error', onError);
secure_server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Port ' + port_https + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port ' + port_https + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = secure_server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);

    var ad = mdns.createAdvertisement(
        mdns.tcp('est'),
        addr.port,{
            name: 'est-server'
        });
    ad.start();
}
