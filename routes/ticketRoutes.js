const express = require('express');

const {createTicket, createSampleTicket} = require('./services/ticketService');
const {generateQrCode} = require('../qr')
const ticketRouter = express.Router();

const {Ticket} = require('../schema'); // Adjust path as needed

const fs = require('fs');

// GET ticket by ticketId and send QR code as a JPEG
ticketRouter.get('/get-ticket/:ticketId', async (req, res) => {
    const { ticketId } = req.params;

    try {
        const ticket = await Ticket.findOne({ ticketId: ticketId });
        
        if (!ticket) {
            return res.status(404).send('Ticket not found');
        }

        // Generate file path for QR code
        const outputPath = `./tmp/${ticketId}.jpg`;

        await generateQrCode(ticketId, outputPath);

        // Stream the file back to the client
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(outputPath)
            .on('open', () => {
                fs.unlink(outputPath, (err) => {
                    if (err) console.error("Error cleaning up:", err);
                });
            })
            .on('error', (err) => {
                res.status(500).send('Error sending the file');
            })
            .pipe(res);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

module.exports = ticketRouter;
