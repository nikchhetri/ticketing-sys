const { connect } = require('./db'); // Import the connect function
const {createApp} = require('./app')

// Middleware for serving static files from Webflow
const app = createApp();
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
