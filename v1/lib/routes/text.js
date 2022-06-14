var ping = require('ping');

module.exports = function(app, methods) {
    app.get('/text/ping', (req, res) => {
        const { url } = req.query;
        ping.sys.probe(url, function(isAlive){
            res.status(200).send([url, isAlive ? 'Online' : 'Offline']);
        });
    })
}