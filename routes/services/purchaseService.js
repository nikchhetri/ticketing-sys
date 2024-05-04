const {Ticket, Event, Purchase} = require('../../schema'); // adjust path as needed
const { createTicket } = require('./ticketService');

async function createPurchase(purchaseData) {
    try{
        const {purchaseEmail, phoneNumber, firstName, lastName, stripePayload, eventId, numberOfTickets, purchaseTicketTypes} = purchaseData;
        if(!purchaseEmail || !phoneNumber ||!firstName || !lastName || !stripePayload || eventId || !numberOfTickets || !purchaseTicketTypes){
            throw new Error('Not all required fields were provided')
        }

        n = 0;
        purchaseTicketTypes.array.forEach(a => {
            n += a.quantity;
        });

        if(numberOfTickets != n) {
            throw new Error('purchase quantity and ticket type data do not match')
        }
        //TODO: verify stripe payload
       
        const ticketId = [];
        for(i=0; i<numberOfTickets; i++ ){
            const ticketData = {
                stripeTransactionId: stripePayload.transactionsId,
                email: purchaseEmail,
                phone: purchasePhone,
                ticketTypeId: [1]
            }
            await createTicket()
        }




    }catch(error) {
        console.error('Error Creating Purchase:', error)
        throw error
    }
}