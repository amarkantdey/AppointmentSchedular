const firebase = require("../db");
const Event = require("../models/event");
const {
    getSlots,
    getAvailableSlots,
    validateEvent,
    filterEventsBasedOnStartAndEndDates,
    getUTCFormat,
    getTimeZoneFormat,
    checkForOverlappingEvents,
} = require("../services/eventServices");
const firestore = firebase.firestore();
var moment = require("moment-timezone");

const freeSlots = async (req, res, next) => {
    try {
        const { date, timezone } = req.query;

        let slots = [];
        slots = await getSlots(date, timezone);

        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = [];
        if (data.empty) {
            res.status(200).send(slots);
        } else {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    getTimeZoneFormat(doc.data().start_event, timezone).substring(0, 19),
                    getTimeZoneFormat(doc.data().end_event, timezone).substring(0, 19)
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
        const event = ({ start_event, end_event, timezone } = req.body);

        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = [];
        if (!data.empty) {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    getTimeZoneFormat(doc.data().start_event, timezone).substring(0, 19),
                    getTimeZoneFormat(doc.data().end_event, timezone).substring(0, 19)
                );
                eventsArray.push(event);
            });
        }

        //Check for overlapping events
        if(!checkForOverlappingEvents(start_event, end_event, eventsArray)){
            res.status(422).send("Event already exists between the selected range");
        }
        
        if (validateEvent(moment(start_event), moment(end_event), eventsArray)) {
            event.start_event = getUTCFormat(event.start_event)
            event.end_event = getUTCFormat(event.end_event)
            delete event.timezone
            await firestore.collection("events").add(event);
            res.status(200).send("Appointment booked successfully");
        } else {
            res.status(400).send("Event timings range not allowed");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getAllEvent = async (req, res, next) => {
    try {
        const {startDate, endDate, timezone } = req.query;
        const events = await firestore.collection("events");
        const data = await events.get();
        const eventsArray = []; 
        if (data.empty) {
            res.status(404).send("No events found");
        } else {
            data.forEach((doc) => {
                const event = new Event(
                    doc.id,
                    getTimeZoneFormat(doc.data().start_event, timezone).substring(0, 19),
                    getTimeZoneFormat(doc.data().end_event, timezone).substring(0, 19)
                );
                eventsArray.push(event);
            });
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

