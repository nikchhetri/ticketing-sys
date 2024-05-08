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
    if(!a.ticketTypes){
        console.log('no a.ticketTypes')
        a.ticketTypes = [{
            description: "Regular",
            price: a.price,
            ticketTypeId: 1
        }]
    }
    const newEvent = new Event({
        eventName: a.eventName,
        eventId: a.eventId,
        eventPhotoUrl: a.eventPhotoUrl,
        numberOfTickets: a.numberOfTickets,
        numberOfSales: 0,
        eventLocation: a.eventLocation,
        eventDescription: a.eventDescription,
        active: true,
        ticketTypes: a.ticketTypes
    });
    console.log(newEvent)
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