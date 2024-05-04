const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('./routes/eventRoutes');
const ticketRouter = require('./routes/ticketRoutes');
function createApp() {
    const app = express();

    app.use(express.static(__dirname + '/publica'));
    app.use(bodyParser.json());  // To parse JSON bodies
    
    app.use('/api/events', eventRouter);
    app.use('/api/tickets', ticketRouter)
    

    return app;
}

module.exports = {createApp}
