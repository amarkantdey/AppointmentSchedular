const express = require('express');
const {addEvent, getAllEvent, freeSlots} = require('../controllers/eventController');

const router = express.Router();

router.get('/freeSlots', freeSlots);
router.get('/event', getAllEvent);
router.post('/event', addEvent);

module.exports = {
    routes: router 
}