module.exports = function(app, methods) {
    app.get('/user/new', (req, res) => {
        var token = app.newUser(req.query);
        res.status(200).send(token);
    })

    app.get('/user/set', (req, res) => {
        const { token } = req.query;
        if (methods.isUser(token)) {
            // TODO
            res.status(200).send();
        } else {
            res.status(204).send();
        }
    })

    app.get('/user/get', (req, res) => {
        const { token } = req.query;
        if (methods.isUser(token)) {
            // TODO
            res.status(200).send();
        } else {
            res.status(204).send();
        }
    })

    app.get('/user/delete', (req, res) => {
        const { token } = req.query;
        if (methods.isUser(token)) {
            // TODO
            res.status(200).send();
        } else {
            res.status(204).send();
        }
    })
}