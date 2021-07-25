const firebase = require("../db");
const Event = require("../models/event");
const {
    getSlots,
    getAvailableSlots,
    validateEvent,
    filterEventsBasedOnStartAndEndDates,
} = require("../services/eventServices");
const firestore = firebase.firestore();

const freeSlots = async (req, res, next) => {
    try {
        const { date, timezone } = req.query;

        let slots = [];
        slots = await getSlots(date, timezone);

        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = [];
        if (data.empty) {
            res.status(404).send("No events found");
        } else {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    doc.data().start_event,
                    doc.data().end_event
                );
                eventsArray.push(event);
            });
        }

        let regex = new RegExp(date);
        filteredEventBasedOnDates = eventsArray.filter((event) =>
            regex.test(event.start_event)
        );

        slots = getAvailableSlots(slots, filteredEventBasedOnDates);

        return res.status(200).send(slots);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const addEvent = async (req, res, next) => {
    try {
        const event = ({ start_event, end_event } = req.body);

        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = [];
        if (data.empty) {
            res.status(404).send("No events found");
        } else {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    doc.data().start_event,
                    doc.data().end_event
                );
                eventsArray.push(event);
            });
        }

        if (validateEvent(new Date(start_event), new Date(end_event), eventsArray)) {
            console.log(eventsArray);
            await firestore.collection("events").add(event);
            res.status(200).send("Record added successfully");
        } else {
            res.status(400).send("Event timings range not allowed");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllEvent = async (req, res, next) => {
    try {
        const {startDate, endDate } = req.query;
        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = []; 
        if (data.empty) {
            res.status(404).send("No events found");
        } else {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    doc.data().start_event,
                    doc.data().end_event
                );
                eventsArray.push(event);
            });
            //res.send(eventsArray);
        }

        filteredEvents = filterEventsBasedOnStartAndEndDates(eventsArray, startDate, endDate);

        return res.status(200).send(filteredEvents);

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    addEvent,
    getAllEvent,
    freeSlots,
};
