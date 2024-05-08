const express = require('express');
const { createPurchase } = require('./services/purchaseService');
const purchaseRouter = express.Router();

purchaseRouter.post('/create-purchase',async (req, res, next) => {
    try {
        const purchaseData = req.body;
        const purchase = await createPurchase(purchaseData);
        res.status(201).send(purchase);
    } catch (error) {
        next(error);
    }
})

module.exports = purchaseRouter