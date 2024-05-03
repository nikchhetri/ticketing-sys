const express = require('express');
const eventRouter = express.Router();
const { createEvent, getActiveEvents } = require('./services/eventService');

eventRouter.post('/create-event', async (req, res, next) => {
    try {
        const eventData = req.body;
        const event = await createEvent(eventData);
        res.status(201).send(event);
    } catch (error) {
        next(error);
    }
});

eventRouter.get('/get-active-events', async (req, res, next) => {
    try {
        const activeEvents = await getActiveEvents();
        res.status(200).send(activeEvents);
    } catch (error) {
        next(error);
    }
});

module.exports = eventRouter;
