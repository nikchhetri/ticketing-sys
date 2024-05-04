const mongoose = require('mongoose');

const purchaseTicketTypeSchema = new mongoose.Schema({
  ticketTypeId: {type: String, required: true},
  quantity: {type: Number, required: true}
})

const purchaseSchema = new mongoose.Schema({
  purchaserEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  stripePayload: { type: mongoose.Schema.Types.Mixed, required: true },
  eventId: {type: String, required: true},
  numberOfTickets: {type: Number, required: true},
  purchaseTicketTypes: [purchaseTicketTypeSchema],
  ticketId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }],
});

const ticketTypeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ticketTypeId: {type: Number, required: true}
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventId: { type: String, required: true, unique: true },
  eventPhotoUrl: { type: String, required: true },
  numberOfSales: { type: Number, default: 0 },
  numOfTickets: {type: Number, default: 99999},
  eventLocation: { type: String, required: true },
  eventDescription: { type: String, required: true },
  active: { type: Boolean, default: true},
  ticketTypes: [ticketTypeSchema]
});


const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  stripeTransactionId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  ticketTypeId: {type: Number, require: true},
  eventId: {type: String, require: true},
  purchaseId: {type: String, require: true}
});

// Model creation
const Purchase = mongoose.model('Purchase', purchaseSchema);
const Event = mongoose.model('Event', eventSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Purchase, Event, Ticket };
