const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('./routes/eventRoutes')
function createApp() {
    const app = express();

    app.use(express.static(__dirname + '/publica'));
    app.use(bodyParser.json());  // To parse JSON bodies
    
    app.use('/api', eventRouter);

    return app;
}

module.exports = {createApp}
