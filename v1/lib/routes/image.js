var ping = require('ping');
const request = require('request');

module.exports = function(app, methods) {
    app.get('/image/hello', (req, res) => {
        methods.sendCanvasAsResponse(methods.renderHelloWorldImage(), res)
    });

    app.get('/image/color', (req, res) => {
        const { token, color, text } = req.query;
        var r_text = text != undefined ? methods.resolveString(text, token) : '';
        var r_color = color != undefined ? methods.resolveString(color, token) : '#ffffff';
        methods.sendCanvasAsResponse(methods.renderColorImage(r_color, r_text), res);
    })

    app.get('/image/string', (req, res) => {
        const { text, token } = req.query;
        var r_text = methods.resolveString(text, token);
        methods.sendCanvasAsResponse(methods.renderStringImage(r_text), res);
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
        console.log(url);
        request({ url: url, encoding: null }, (error, response, buffer) => {
            if ((!error) && (response.statusCode === 200)){
                res.set("Content-Type", "image/png");
                res.send(response.body);
            }
        });
    })
}