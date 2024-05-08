const {Ticket, Event, Purchase} = require('../../schema'); // adjust path as needed
const { createTicket } = require('./ticketService');
const {mongoose} = require('mongoose')

async function createPurchase(purchaseData) {
    try{
        const {purchaseEmail, phoneNumber, firstName, lastName, stripePayload, eventId, numberOfTickets, purchaseTicketTypes} = purchaseData;
        if(!purchaseEmail || !phoneNumber ||!firstName || !lastName || !stripePayload || !eventId || !numberOfTickets || !purchaseTicketTypes){
            throw new Error('Not all required fields were provided')
        }

        n = 0;
        purchaseTicketTypes.forEach(a => {
            n += a.quantity;
        });

        if(numberOfTickets != n) {
            throw new Error('purchase quantity and ticket type data do not match')
        }
        //TODO: verify stripe payload
       
        const tickets =[];
        const ticketIds = [];

    // Loop through each ticket type in the purchase list
        for (const ticketType of purchaseTicketTypes) {
            // Loop through the quantity specified for each ticket type
           
            for (let i = 0; i < ticketType.quantity; i++) {
                ticketData = {
                    stripeTransactionId: stripePayload.transactionId,
                    email: purchaseEmail,
                    phone: phoneNumber,
                    ticketTypeId: ticketType.ticketTypeId,
                    eventId: eventId,
                    purchaseId: "temp"
                };
                // Call createTicket for each ticket and collect all promises
                const ticket = await createTicket(ticketData);
                tickets.push(ticket)
                ticketIds.push(ticket._id.toString())
                console.log('created ticket ', ticket);
            }
        }
    
        console.log('All tickets created successfully:', tickets);
        //create purchase document
        const newPurchase = new Purchase({
            purchaserEmail: purchaseEmail,
            phoneNumber: phoneNumber,
            firstName,
            lastName,
            stripePayload,
            eventId,
            numberOfTickets,
            purchaseTicketTypes,
            ticketId: ticketIds
        })

        const purchase = await newPurchase.save();
        console.log('purchased')
        console.log(ticketIds);
        for(const id of ticketIds) {
            await Ticket.updateMany({
                _id: id
            },{
                purchaseId: purchase._id.toString()
            })
        };
        console.log('purchase id updated on tickets')
        return purchase;
    }catch(error) {
        console.error('Error Creating Purchase:', error)
        throw error
    }
}

module.exports = {createPurchase}