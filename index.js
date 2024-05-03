const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { connect } = require('./db'); // Import the connect function
const {createEvent} = require('./eventCreator')
const app = express();
const {Event} = require('./schema')

// Middleware for serving static files from Webflow
app.use(express.static(__dirname + '/publica'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // To parse JSON bodies

app.post('/api/events', async (req, res) => {
  try {
    const eventData = req.body;
    const event = await createEvent(eventData);  // Assuming createEvent handles event creation
    res.status(201).send(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send({ error: 'Failed to create event' });
  }
});

app.get('/api/active-events', async (req, res) => {
    try {
      const activeEvents = await getActiveEvents(); // Assuming this function retrieves active events
      res.status(200).send(activeEvents);
    } catch (error) {
      console.error('Error fetching active events:', error);
      res.status(500).send({ error: 'Failed to fetch active events' });
    }
  });
  

  async function getActiveEvents() {
    try {
      const activeEvents = await Event.find({ active: true });
      return activeEvents;
    } catch (error) {
      console.error('Error retrieving active events:', error);
      throw error; // Rethrowing the error to be handled by the caller
    }
  }

// Asynchronous function to start the server
async function startServer() {
  try {
    await connect(); // Ensure DB connection is made
    console.log('Successfully connected to MongoDB!');
    // Start listening only after DB connection is established
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();
