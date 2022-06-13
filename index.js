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
    ctx.canvas.width  = ctx.measureText(url).width + 112;
    ctx.fillStyle = isActive ? "#7cd992" : "#eb6060";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px sans-serif';
    ctx.fillText(url, 80, 24);
    ctx.font = '16px sans-serif';
    ctx.fillText(isActive ? 'Online' : 'Offline', 80, 48);
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.lineWidth = 2;
    var x = 16 + ctx.canvas.height / 2;
    var y = ctx.canvas.height / 2
    ctx.arc(x, y, (ctx.canvas.height - 16) / 2, 0, 2 * Math.PI);
    ctx.stroke(); 
    if (isActive) {
        ctx.beginPath();
        ctx.lineTo(x - 12, y + 2);
        ctx.lineTo(x - 4, y + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x - 4, y + 10);
        ctx.lineTo(x + 10, y - 8);
        ctx.stroke();

    } else {
        ctx.beginPath();
        ctx.lineTo(x - 8, y - 8);
        ctx.lineTo(x + 8, y + 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(x - 8, y + 8);
        ctx.lineTo(x + 8, y - 8);
        ctx.stroke();
    }
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