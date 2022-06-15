var ping = require('ping');
const axios = require('axios');

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

    app.get('/image/badge', (req, res) => {
        const { token, label, message, color } = req.query;
        const r_label = methods.resolveString(label, token);
        const r_message = methods.resolveString(message, token);
        const r_color = methods.resolveString(color, token);
        var url = encodeURI(`https://img.shields.io/badge/${r_label}-${r_message}-${r_color}.png`);
        axios.get(url).then((response) => {
            res.setHeader("Content-Type", "image/png")
            res.status(200).send(response.status == '200' ? response.data : '');
        });
    })
}