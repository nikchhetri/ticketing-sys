const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  purchaseId: { type: String, required: true, unique: true },
  purchaserEmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  stripePayload: { type: mongoose.Schema.Types.Mixed, required: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventId: { type: String, required: true, unique: true },
  eventPhotoUrl: { type: String, required: true },
  numberOfSales: { type: Number, default: 0 },
  eventLocation: { type: String, required: true },
  eventDescription: { type: String, required: true },
  active: { type: Boolean, default: true}
});

const ticketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  stripeTransactionId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

// Model creation
const Purchase = mongoose.model('Purchase', purchaseSchema);
const Event = mongoose.model('Event', eventSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Purchase, Event, Ticket };
