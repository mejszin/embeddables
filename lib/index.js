const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const { createCanvas } = require('canvas');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 83;

const VERSION = 'v0.0.1';

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

const methods = {};

methods.createCanvas = (width, height) => {
    return createCanvas(width, height);
};

methods.sendCanvasAsResponse = (canvas, res) => {
    var img = Buffer.from(canvas.toBuffer(), 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
};

require('./renders/helpers.js')(app, methods);
require('./renders/helloworld.js')(app, methods);
require('./renders/ping.js')(app, methods);
require('./renders/time.js')(app, methods);

require('./routes/image.js')(app, methods);
require('./routes/text.js')(app, methods);

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));