const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const { createCanvas } = require('canvas')
var ping = require('ping');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 83;

const VERSION = 'v0.0.1';

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

const sendCanvasAsResponse = (canvas, res) => {
    var img = Buffer.from(canvas.toBuffer(), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
};

const renderHelloWorldImage = () => {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.font = '24px serif';
    ctx.rotate(0.3);
    ctx.fillText('Hello world!', 50, 70);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 80);
    ctx.lineTo(50 + ctx.measureText('Hello world!').width, 80);
    ctx.stroke();
    return canvas;
}

const renderWebsiteStatus = (url, isActive) => {
    const canvas = createCanvas(200, 56);
    const ctx = canvas.getContext('2d');
    ctx.font = '24px sans-serif';
    ctx.canvas.width  = ctx.measureText(url).width + 32;
    ctx.font = '24px sans-serif';
    ctx.fillText(url, 16, 24);
    ctx.font = '16px sans-serif';
    ctx.fillStyle = isActive ? "#7cd992" : "#eb6060";
    ctx.fillText(isActive ? 'Online' : 'Offline', 16, 48);
    return canvas;
}

app.get('/helloworld', (req, res) => {
    sendCanvasAsResponse(renderHelloWorldImage(), res)
});

app.get('/status/website', (req, res) => {
    const { url } = req.query;
    ping.sys.probe(url, function(isAlive){
        sendCanvasAsResponse(renderWebsiteStatus(url, isAlive), res)
    });
})

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));