var ping = require('ping');

module.exports = function(app, methods) {
    app.get('/image/hello', (req, res) => {
        methods.sendCanvasAsResponse(methods.renderHelloWorldImage(), res)
    });

    app.get('/image/string', (req, res) => {
        const { str, token } = req.query;
        var text = methods.resolveString(str, token);
        methods.sendCanvasAsResponse(methods.renderStringImage(text), res);
    })
    
    app.get('/image/time', (req, res) => {
        methods.sendCanvasAsResponse(methods.renderTimeImage(), res)
    })
    
    app.get('/image/ping', (req, res) => {
        const { url } = req.query;
        ping.sys.probe(url, function(isAlive) {
            methods.sendCanvasAsResponse(methods.renderPingStatus(url, isAlive), res)
        });
    })
}