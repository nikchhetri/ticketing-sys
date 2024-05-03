// Example function to create a new event
const {Event} = require('./schema')

const createEvent = async () => {
    const newEvent = new Event({
      eventName: "Annual Tech Summit",
      eventId: "ATS2024",
      eventPhotoUrl: "https://example.com/photos/ats2024.jpg",
      numberOfSales: 0,
      eventLocation: "Convention Center, Downtown",
      eventDescription: "A gathering of technology enthusiasts and professionals to discuss emerging tech trends."
    });
  
    try {
      const savedEvent = await newEvent.save()
        .catch(error => {
            console.error('Error in createEvent:', error);
        });
      ; // This saves the new event to the MongoDB database
      return savedEvent;
    } catch (error) {
      console.error("Error creating the event:", error);
    }
  };
 
  module.exports = {createEvent}
 
  
