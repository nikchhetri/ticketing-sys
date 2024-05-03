const {Event} = require('../../schema')

async function getActiveEvents() {
    try {
    const activeEvents = await Event.find({ active: true });
    return activeEvents;
    } catch (error) {
    console.error('Error retrieving active events:', error);
    throw error; // Rethrowing the error to be handled by the caller
    }
}


async function createEvent (a) {
    const newEvent = new Event({
      eventName: a.eventName,
      eventId: a.eventId,
      eventPhotoUrl: a.eventPhotoUrl,
      numberOfSales: 0,
      eventLocation: a.eventLocation,
      eventDescription: a.eventDescription
    });
    console.log(typeof newEvent)
    console.log(typeof a)
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
 
  

module.exports = {getActiveEvents, createEvent}