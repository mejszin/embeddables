const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create application/json parser
// this will only handle application/json requests
// and will be passed to the route handler as middleware

app.locals.jsonParser = bodyParser.json()
app.locals.urlencodedParser = bodyParser.urlencoded({ extended: true })

const PORT = 83;

const VERSION = 'v0.0.1';

app.get('/ping', (req, res) => {
    res.status(200).send('Pong!');
});

app.listen(PORT, () => console.log(`It's alive on port ${PORT}!`));