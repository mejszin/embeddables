const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const { createCanvas, loadImage } = require('canvas')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 83;

const VERSION = 'v0.0.1';

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

app.get('/helloworld', (req, res) => {
    const canvas = createCanvas(200, 200)
    const ctx = canvas.getContext('2d')
    // Write "Awesome!"
    ctx.font = '24px serif'
    ctx.rotate(0.3)
    ctx.fillText('Hello world!', 50, 70)
    // Draw line under text
    var text = ctx.measureText('Awesome!')
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 80)
    ctx.lineTo(75 + text.width, 80)
    ctx.stroke()
    // Create outputs
    var img = Buffer.from(canvas.toBuffer(), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));