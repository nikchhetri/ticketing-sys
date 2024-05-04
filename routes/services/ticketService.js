const {Ticket, Event, Purchase} = require('../../schema'); // adjust path as needed
const {encodeData} = require('../../encoder')
async function createTicket(ticketData) {
    try {
        const {stripeTransactionId, email, phone, ticketTypeId, eventId, purchaseId } = ticketData;

        // Validate the inputs (basic example)
        if ( !stripeTransactionId || !email || !phone || !ticketTypeId || !eventId || !purchaseId) {
            throw new Error('Missing required fields');
        }
        
        const event = await Event.findOne({"eventId": eventId})
        if(!event){
            throw new Error('No Associated Event')
        }
        if(event.ticket_types.ticketTypeId != ticketTypeId){
            throw new Error('ticketType does not match')
        }
        
        // const purchase = await Purchase.findById(purchaseId)
        // if(!purchase) {
        //     throw new Error('Purchase not found');
        // }

        const ticketId = encodeData(stripeTransactionId);
        const newTicket = new Ticket({
            ticketId,
            stripeTransactionId,
            email,
            phone,
            adult,
            eventId,
            purchaseId
        });

        const savedTicket = await newTicket.save();
        console.log('Ticket created successfully:', savedTicket);
        
        event.numberOfSales = event.numberOfSales + 1;
        await event.save();

        return savedTicket;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error; // Rethrow the error to handle it in the caller function (e.g., in an Express route)
    }
}

async function createSampleTicket() {
    console.log('create sample ticket called')
    const ticketData = {
        stripeTransactionId: "txn_1HJK218JNIOEqxzmtu5BvLOf",
        email: "example@example.com",
        phone: "+1234567890",
        adult: true,
        eventId: "wedd",
        purchaseId: "123"
    };
    await createTicket(ticketData);
}



module.exports = {createTicket, createSampleTicket};