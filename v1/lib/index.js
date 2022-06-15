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

methods.randomString = (length = 8) => {
    var char_set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var id = '';
    for (var i = 0; i < length; i++) {
        id += char_set.charAt(
            Math.floor(Math.random() * char_set.length)
        );
    }
    return id;
}

require('./users.js')(methods);

require('./renders/helpers.js')(app, methods);
require('./renders/helloworld.js')(app, methods);
require('./renders/ping.js')(app, methods);
require('./renders/time.js')(app, methods);
require('./renders/string.js')(app, methods);

require('./routes/image.js')(app, methods);
require('./routes/text.js')(app, methods);
require('./routes/user.js')(app, methods);

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

app.get('/test', (req, res) => {
    var str = methods.resolveString('My name is $forename $surname!', 'testuser');
    res.status(200).send(str);
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));