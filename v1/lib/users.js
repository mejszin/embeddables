const fs = require('fs');
const user_data_path = './data/users.json';
var user_data = JSON.parse(fs.readFileSync(user_data_path));

module.exports = function(methods) {
    methods.isUser = (token) => {
        return ((token != null) && (token != undefined) && (token in user_data));
    }

    methods.validKey = (key) => {
        return ((key != undefined) && (key != null));
    }
    
    methods.newToken = () => {
        var novel = false;
        while (!novel) {
            var token = methods.randomString();
            novel = !methods.isUser(token);
        };
        return token;
    }
    
    methods.newUser = (query = {}) => {
        var token = methods.newToken();
        user_data[token] = {
            vars: query,
            actions: {
                count: 1,
                last_at: new Date().toLocaleString(),
                created_at: new Date().toLocaleString()
            }
        }
        return token;
    }
    
    methods.setUserVar = (token, key, value) => {
        if (methods.isUser(token)) {
            user_data[token].vars[key] = value;
        }
    }
    
    methods.getUserVar = (token, key) => {
        if (methods.isUser(token) && methods.validKey(key)) {
            return user_data[token].vars[key];
        } else {
            return null;
        }
    }
    
    methods.deleteUserVar = (token, key) => {
        if (methods.isUser(token) && methods.validKey(key) && (key in user[token].vars)) {
            delete user_data[token].vars[key];
            return true;
        }
        return false;
    }
    
    methods.writeUsers = () => {
        fs.writeFileSync(user_data_path, JSON.stringify(user_data));
    }

    methods.resolveString = (str, token = null) => {
        if (methods.isUser(token)) {
            const found = str.match(/\$\w+/g);
            found.forEach ((before) => {
                var after = methods.getUserVar(token, before.slice(1));
                if (after != undefined) { str = str.replace(before, after) };
            });
            return str;
        } else {
            return str;
        }
    }
}