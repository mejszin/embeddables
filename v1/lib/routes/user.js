module.exports = function(app, methods) {
    app.get('/user/token', (req, res) => {
        var token = methods.newToken();
        res.status(200).send(token);
    })

    app.get('/user/new', (req, res) => {
        var token = methods.newUser(req.query);
        res.status(200).send(token);
    })

    app.get('/user/set', (req, res) => {
        const { token } = req.query;
        if (methods.isUser(token)) {
            for (var key in req.query) {
                if (key != 'token') {
                    methods.setUserVar(token, key, req.query[key]);
                }
            }
            methods.writeUsers()
            res.status(200).send();
        } else {
            res.status(204).send();
        }
    })

    app.get('/user/get', (req, res) => {
        const { token, key } = req.query;
        if (methods.isUser(token)) {
            var value = methods.getUserVar(token, key);
            res.status(200).send(value);
        } else {
            res.status(204).send();
        }
    })

    app.get('/user/delete', (req, res) => {
        const { token, key } = req.query;
        if (methods.isUser(token)) {
            var bool = methods.deleteUserVar(token, key);
            if (bool) { methods.writeUsers() }
            res.status(200).send(bool);
        } else {
            res.status(204).send();
        }
    })
}